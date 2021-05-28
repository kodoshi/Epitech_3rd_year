#include "parser.hpp"

using namespace std;

bool v_comparator(const pair<string, string> &a, const pair<string, string> &b)
{
    return a.first < b.first;
}

void name_separator(vector<string> holder_array, int mode, int max_connections, string a_name, string b_name)
{
    vector<string> total_names;
    vector<pair<string, string>> pair_connection;
    int i = 0, size = holder_array.size();
    size_t found;
    string first_name, second_name, default_phrase = " is friends with ";
    bool non_alpha, whitespace;

    while (i < size)
    {
        found = holder_array[i].find(default_phrase);
        if (found != string::npos)
        {
            first_name = holder_array[i].substr(0, found);
            second_name = holder_array[i].substr(found + 17);

            non_alpha = !(std::regex_match(first_name, std::regex("^[A-Za-zÀ-ÿ_ ]+$")) && std::regex_match(second_name, std::regex("^[A-Za-zÀ-ÿ_ ]+$")));
            whitespace = (isspace(first_name[0]) || isspace(second_name[0]));

            if (!(first_name.length() >= 1 && second_name.length() >= 1) || non_alpha || whitespace)
            {
                cout << "A name does not have the right formatting" << endl;
                exit(84);
            }
            pair_connection.push_back(make_pair(first_name, second_name));
        }
        else
        {
            cout << "A sentence does not have the right formatting" << endl;
            exit(84);
        }
        i++;
    }

    for (int j = 0; j < size; j++)
    {
        total_names.push_back(pair_connection[j].first);
        total_names.push_back(pair_connection[j].second);
    }

    std::sort(total_names.begin(), total_names.end()); //sort, for CLI display only
    vector<string>::iterator iter;

    iter = std::unique(total_names.begin(), total_names.begin() + total_names.size()); //removes duplicate entries, only to be shown
    total_names.resize(std::distance(total_names.begin(), iter));

    if (mode == 1)
    {
        for (size_t k = 0; k < total_names.size(); k++) //displaying the total names
        {
            cout << total_names[k] << "\n";
        }
        cout << "\n"; // done with the name display
    }
    std::sort(pair_connection.begin(), pair_connection.end(), v_comparator);
    vector<vector<string>> big_list;
    vector<string> temp;

    for (size_t k = 0; k < total_names.size(); k++) //filling big_list
    {
        temp.push_back(total_names[k]);
        for (size_t q = 0; q < pair_connection.size(); q++)
        {
            if (total_names[k] == pair_connection[q].first)
            {
                temp.push_back(pair_connection[q].second);
            }
            if (total_names[k] == pair_connection[q].second)
            {
                temp.push_back(pair_connection[q].first);
            }
        }
        big_list.push_back(temp);
        temp.clear();
    }

    for (size_t k = 0; k < big_list.size(); k++)
    {
        //sorting every sub-vector in big_list, from index 1 to end(),
        //since in index 0 is the 'carrier'
        std::sort(big_list[k].begin() + 1, big_list[k].end());
    }

    int adjacency_array[int(total_names.size())][int(total_names.size())] = {};
    size_t index;
    for (size_t n = 0; n < big_list.size(); n++) //kinda inefficient but necessary since big_list[n].size() is dynamic
    {
        for (size_t m = 0; m < big_list[n].size(); m++)
        {
            index = 0;
            while (index < total_names.size())
            {
                if (big_list[n][m] == total_names[index] && (n != index))
                {
                    adjacency_array[n][index] = 1;
                    break;
                }
                index++;
            }
        }
    }
    if (mode == 1)
    {
        for (size_t k = 0; k < total_names.size(); k++)
        {
            for (size_t q = 0; q < total_names.size(); q++)
            {
                if (q != total_names.size() - 1)
                {
                    cout << adjacency_array[k][q] << " ";
                }
                else
                {
                    cout << adjacency_array[k][q];
                }
            }
            cout << "\n";
        }
    }

    int distance[total_names.size()][total_names.size()];

    for (size_t i = 0; i < total_names.size(); i++)
    {
        for (size_t j = 0; j < total_names.size(); j++)
        {
            if (i == j)
            {
                distance[i][j] = 0;
            }
            else if (adjacency_array[i][j] == 0)
            {
                distance[i][j] = INF;
            }
            else
            {
                distance[i][j] = adjacency_array[i][j];
            }
        }
    }

    for (size_t k = 0; k < total_names.size(); k++)
    {
        for (size_t i = 0; i < total_names.size(); i++)
        {
            for (size_t j = 0; j < total_names.size(); j++)
            {
                if (distance[i][k] + distance[k][j] < distance[i][j])
                {
                    distance[i][j] = distance[i][k] + distance[k][j];
                }
            }
        }
    }
    if (mode == 1)
    {
        cout << "\n";
        for (size_t i = 0; i < total_names.size(); i++) //display shortest path
        {
            for (size_t j = 0; j < total_names.size(); j++)
            {
                if (distance[i][j] <= max_connections)
                {
                    if (j != total_names.size() - 1)
                    {
                        cout << distance[i][j] << " ";
                    }
                    else
                    {
                        cout << distance[i][j];
                    }
                }
                else
                {
                    if (j != total_names.size() - 1)
                    {
                        cout << 0 << " ";
                    }
                    else
                    {
                        cout << 0;
                    }
                    //cout << 0 << " ";
                }
            }
            cout << "\n";
        }
    }
    if (mode == 2)
    {
        int y_coord = -1, x_coord = -1;
        if (!(std::regex_match(a_name, std::regex("^[A-Za-zÀ-ÿ_ ]+$")) && std::regex_match(b_name, std::regex("^[A-Za-zÀ-ÿ_ ]+$"))))
        {
            cout << "Bad CLI arguments." << endl;
            exit(84);
        }
        for (int i = 0; i < int(total_names.size()); i++)
        {
            if (a_name == total_names[i])
            {
                y_coord = i;
                break;
            }
        }
        for (int j = 0; j < int(total_names.size()); j++)
        {
            if (b_name == total_names[j])
            {
                x_coord = j;
                break;
            }
        }
        if (!(y_coord == -1 || x_coord == -1))
        {
            cout << "Degree of separation between " << a_name << " and " << b_name << ": " << distance[y_coord][x_coord] << endl;
        }
        else
        {
            cout << "Degree of separation between " << a_name << " and " << b_name << ": -1" << endl; //Degree of separation between Yvette Horner and Mike Tyson: -1
        }
    }
}