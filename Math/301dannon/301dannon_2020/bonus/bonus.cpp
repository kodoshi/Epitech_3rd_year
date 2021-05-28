#include "selection.hpp"
#include "insertion.hpp"
#include "bubble.hpp"
#include "merge.hpp"
#include "quick.hpp"
#include "shell.hpp"
#include <ctype.h>

using namespace std;

int main(int argc, char *argv[])
{
    string help = "-h";
    if (argc == 1 || argc > 2)
    {
        //cout << "Enter a CLI argument." << endl;
        exit(84);
    }
    if (argv[1] == help)
    {
        std::cout << "USAGE\n"
                  << "    ./301bonus file\n"
                  << "DESCRIPTION\n"
                  << "    file    file that contains the numbers to be sorted, separated by spaces\n";
        exit(84);
    }

    ifstream dictionary;
    string value;
    vector<double> holder_array;

    dictionary.open(argv[1]);
    if (dictionary.is_open())
    {
        while (dictionary >> value)
        {
            try
            {
                holder_array.push_back(stod(value)); //stod will throw an invalid_argument Exception if it receives a string that cannot be converted to a double
            }
            catch (const std::invalid_argument &ia)
            {
                std::cerr << "Invalid argument: " << ia.what() << endl;
                exit(84);
            }
        }
        dictionary.close(); // Close file after populating holder_array
    }
    else
    {
        cout << "File couldn't be opened." << endl;
        exit(84);
    }

    //here we feed the holder_array to the different sort algorithms
    //and display the number of comparisons they needed to compare X amount of numbers
    cout << holder_array.size() << " elements"
         << "\n";
    cout << "MinMax Selection sort: " << minmax_selection_sort(holder_array) << " comparisons"
         << "\n";
    cout << "Improved Insertion sort: " << improved_insertion_sort(holder_array) << " comparisons"
         << "\n";
    cout << "Improved Bubble sort: " << improved_bubble_sort(holder_array) << " comparisons"
         << "\n";
    cout << "Shell sort: " << basic_shell_sort(holder_array) << " comparisons"
         << "\n";

    // VISUALISATION GENERATION BELOW
    int indexes[] = {19, 39, 79, 159, 319, 639, 1279, 2559, 5119, 10239};
    vector<double> temp_array;
    double random_numbers[10240];   //this array contains a long list of random numbers, which will be split into 10 smaller arrays that will be sorted in order to generate the graphs
                                    //these 10 arrays will be used as X values to generate the Y comparisons in our graphs, 10 coord points for every sort algorithm
                                    //the smaller arrays will be divided in sizes of 20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240 random elements
    for (int q = 0; q < 10240; q++) //filling original array with 10240 random elements
    {
        random_numbers[q] = rand() % (100001);
    }
    int p, g;

    //string file_name = "chart.txt";
    ofstream newfile;
    newfile.open("chart"); // opens the file
    if (!newfile)
    { // file couldn't be opened
        cerr << "Error: file could not be opened" << endl;
        exit(84);
    }
    //newfile.open("plot_data.txt", ios::out | ios::trunc);

    for (p = 0; p < 9; p++) //number of sub arrays in random_numbers=10  //number of sorts=7
    {
        temp_array.clear();              //clearing for the next iteration
        for (g = 0; g < indexes[p]; g++) // we write on file smth like this 4 6,21 210   where 4 and 21 are the number of elements in the array, and the 6 and 210 are the number of comparisons needed to sort
        {
            temp_array.push_back(random_numbers[g]);
        }
        if (p == 0)
        {
            newfile << "0 0,"; //so we start from coords 0 0 in the XY axis
        }
        newfile << temp_array.size() << " " << basic_selection_sort(temp_array) << ",";
    }
    newfile << "\n";

    for (p = 0; p < 9; p++) //number of sub arrays in random_numbers=10  //number of sorts=7
    {
        temp_array.clear();                           //clearing for the next iteration
        for (g = indexes[p]; g < indexes[p + 1]; g++) // we write on file smth like this 4 6,21 210   where 4 and 21 are the number of elements in the array, and the 6 and 210 are the number of comparisons needed to sort
        {
            temp_array.push_back(random_numbers[g]);
        }
        if (p == 0)
        {
            newfile << "0 0,"; //so we start from coords 0 0 in the XY axis
        }
        newfile << temp_array.size() << " " << basic_insertion_sort(temp_array) << ",";
    }
    newfile << endl;

    for (p = 0; p < 9; p++) //number of sub arrays in random_numbers=10  //number of sorts=7
    {
        temp_array.clear();                           //clearing for the next iteration
        for (g = indexes[p]; g < indexes[p + 1]; g++) // we write on file smth like this 4 6,21 210   where 4 and 21 are the number of elements in the array, and the 6 and 210 are the number of comparisons needed to sort
        {
            temp_array.push_back(random_numbers[g]);
        }
        if (p == 0)
        {
            newfile << "0 0,"; //so we start from coords 0 0 in the XY axis
        }
        newfile << temp_array.size() << " " << basic_bubble_sort(temp_array) << ",";
    }
    newfile << "\n";

    for (p = 0; p < 9; p++) //number of sub arrays in random_numbers=10  //number of sorts=7
    {
        temp_array.clear();                           //clearing for the next iteration
        for (g = indexes[p]; g < indexes[p + 1]; g++) // we write on file smth like this 4 6,21 210   where 4 and 21 are the number of elements in the array, and the 6 and 210 are the number of comparisons needed to sort
        {
            temp_array.push_back(random_numbers[g]);
        }
        if (p == 0)
        {
            newfile << "0 0,"; //so we start from coords 0 0 in the XY axis
        }
        newfile << temp_array.size() << " " << basic_quick_sort(temp_array) << ",";
    }
    newfile << "\n";

    for (p = 0; p < 9; p++) //number of sub arrays in random_numbers=10  //number of sorts=7
    {
        temp_array.clear();                           //clearing for the next iteration
        for (g = indexes[p]; g < indexes[p + 1]; g++) // we write on file smth like this 4 6,21 210   where 4 and 21 are the number of elements in the array, and the 6 and 210 are the number of comparisons needed to sort
        {
            temp_array.push_back(random_numbers[g]);
        }
        if (p == 0)
        {
            newfile << "0 0,"; //so we start from coords 0 0 in the XY axis
        }
        newfile << temp_array.size() << " " << basic_merge_sort(temp_array) << ",";
    }
    newfile << "\n";

    for (p = 0; p < 9; p++) //number of sub arrays in random_numbers=10  //number of sorts=7
    {
        temp_array.clear();                           //clearing for the next iteration
        for (g = indexes[p]; g < indexes[p + 1]; g++) // we write on file smth like this 4 6,21 210   where 4 and 21 are the number of elements in the array, and the 6 and 210 are the number of comparisons needed to sort
        {
            temp_array.push_back(random_numbers[g]);
        }
        if (p == 0)
        {
            newfile << "0 0,"; //so we start from coords 0 0 in the XY axis
        }
        newfile << temp_array.size() << " " << minmax_selection_sort(temp_array) << ",";
    }
    newfile << "\n";

    for (p = 0; p < 9; p++) //number of sub arrays in random_numbers=10  //number of sorts=7
    {
        temp_array.clear();                           //clearing for the next iteration
        for (g = indexes[p]; g < indexes[p + 1]; g++) // we write on file smth like this 4 6,21 210   where 4 and 21 are the number of elements in the array, and the 6 and 210 are the number of comparisons needed to sort
        {
            temp_array.push_back(random_numbers[g]);
        }
        if (p == 0)
        {
            newfile << "0 0,"; //so we start from coords 0 0 in the XY axis
        }
        newfile << temp_array.size() << " " << improved_insertion_sort(temp_array) << ",";
    }

    newfile << "\n";

    for (p = 0; p < 9; p++) //number of sub arrays in random_numbers=10  //number of sorts=7
    {
        temp_array.clear();                           //clearing for the next iteration
        for (g = indexes[p]; g < indexes[p + 1]; g++) // we write on file smth like this 4 6,21 210   where 4 and 21 are the number of elements in the array, and the 6 and 210 are the number of comparisons needed to sort
        {
            temp_array.push_back(random_numbers[g]);
        }
        if (p == 0)
        {
            newfile << "0 0,"; //so we start from coords 0 0 in the XY axis
        }
        newfile << temp_array.size() << " " << improved_bubble_sort(temp_array) << ",";
    }

    newfile << "\n";

    for (p = 0; p < 9; p++) //number of sub arrays in random_numbers=10  //number of sorts=7
    {
        temp_array.clear();                           //clearing for the next iteration
        for (g = indexes[p]; g < indexes[p + 1]; g++) // we write on file smth like this 4 6,21 210   where 4 and 21 are the number of elements in the array, and the 6 and 210 are the number of comparisons needed to sort
        {
            temp_array.push_back(random_numbers[g]);
        }
        if (p == 0)
        {
            newfile << "0 0,"; //so we start from coords 0 0 in the XY axis
        }
        newfile << temp_array.size() << " " << basic_shell_sort(temp_array) << ",";
    }

    newfile.close();
    return 0;
}