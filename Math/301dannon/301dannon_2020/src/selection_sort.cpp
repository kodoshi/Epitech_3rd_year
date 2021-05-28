#include "selection.hpp"
using namespace std;

void my_swap(double *a, double *b)
{
    double temp;
    temp = *a;
    *a = *b;
    *b = temp;
}

int basic_selection_sort(vector<double> holder_array) //we dont pass with reference or pointer because we dont want the original array to be modified
{
    int count = 0;
    for (size_t i = 0; i < holder_array.size() - 1; ++i)
    {
        size_t min = i;
        for (size_t j = i + 1; j < holder_array.size(); ++j)
        {
            if (holder_array[min] > holder_array[j])
                min = j;
            ++count;
        }
        if (min != i)
        {
            double tmp = holder_array[min];
            holder_array[min] = holder_array[i];
            holder_array[i] = tmp;
        }
    }
    return count;
}

int minmax_selection_sort(vector<double> holder_array)
{
    int n = holder_array.size();
    int i, j, index_min, index_max, count = 0;
    for (i = 0; i < n / 2; i++)
    {
        index_min = i;
        index_max = i;

        for (j = i + 1; j < n - i; j++)
        {
            if (holder_array[j] > holder_array[index_max])
            {
                index_max = j;
            }
            else if (holder_array[j] < holder_array[index_min])
            {
                index_min = j;
            }
            count++;
        }
        if (i == index_max && n - 1 - i == index_min)
        {
            my_swap(&holder_array[index_min], &holder_array[index_max]);
        }
        else
        {
            if ((index_min == n - 1 - i) && (index_max != i))
            {
                my_swap(&holder_array[i], &holder_array[index_min]);
                my_swap(&holder_array[n - 1 - i], &holder_array[index_max]);
            }
            else if ((index_max == i) && (index_min != n - 1 - i))
            {
                my_swap(&holder_array[n - 1 - i], &holder_array[index_max]);
                my_swap(&holder_array[i], &holder_array[index_min]);
            }
            else
            {
                if (index_min != i)
                {
                    my_swap(&holder_array[i], &holder_array[index_min]);
                }
                if (index_max != n - 1 - i)
                {
                    my_swap(&holder_array[index_max], &holder_array[n - 1 - i]);
                }
            }
        }
    }
    return count;
}