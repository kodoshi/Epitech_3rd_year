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
                  << "    ./301dannon file\n"
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
        //cout << "File couldn't be opened." << endl;
        exit(84);
    }

    //here we feed the holder_array to the different sort algorithms
    //and display the number of comparisons they needed to compare X amount of numbers
    cout << holder_array.size() << " elements"
         << "\n";
    cout << "Selection sort: " << basic_selection_sort(holder_array) << " comparisons"
         << "\n";
    cout << "Insertion sort: " << basic_insertion_sort(holder_array) << " comparisons"
         << "\n";
    cout << "Bubble sort: " << basic_bubble_sort(holder_array) << " comparisons"
         << "\n";
    cout << "Quicksort: " << basic_quick_sort(holder_array) << " comparisons"
         << "\n";
    cout << "Merge sort: " << basic_merge_sort(holder_array) << " comparisons"
         << "\n";
    return 0;
}