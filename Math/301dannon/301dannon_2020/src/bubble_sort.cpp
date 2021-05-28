#include "bubble.hpp"
#include "selection.hpp"
using namespace std;

int basic_bubble_sort(vector<double> holder_array)
{
    int count = 0, i, j, n = holder_array.size() - 1;
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n - i; j++)
        {
            if (holder_array[j] > holder_array[j + 1])
            {
                my_swap(&holder_array[j], &holder_array[j + 1]);
            }
            count++;
        }
    }
    return count;
}

int improved_bubble_sort(vector<double> holder_array)
{
    int count = 0, i, j, n = holder_array.size() - 1;
    bool swapped;
    for (i = 0; i < n; i++)
    {
        swapped = false;
        for (j = 0; j < n - i; j++)
        {
            if (holder_array[j] > holder_array[j + 1])
            {
                my_swap(&holder_array[j], &holder_array[j + 1]);
                swapped = true;
            }
            count++;
        }
        if (swapped == false)
        {
            break;
        }
    }
    return count;
}