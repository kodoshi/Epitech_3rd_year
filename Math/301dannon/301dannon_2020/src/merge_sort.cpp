#include "merge.hpp"
#include "selection.hpp"
using namespace std;

int Counter::count{0}; //lets start count from 0

int basic_merge_sort(vector<double> holder_array) //entry point
{
    int end = holder_array.size() - 1;
    mpartition(&holder_array, 0, end);
    return Counter::count;
}

void merge_sort(vector<double> *holder_array, int start, int end, int middle)
{
    int i = start, j = middle + 1, k = 0;
    vector<double> temp(end - start + 1, 0.0);

    while (i <= middle && j <= end)
    {
        if (holder_array->at(i) < holder_array->at(j))
        {
            temp[k] = holder_array->at(i);
            k++;
            i++;
            Counter::count++;
        }
        else
        {
            temp[k] = holder_array->at(j);
            k++;
            j++;
        }
    }

    while (i <= middle)
    {
        temp[k] = holder_array->at(i);
        k++;
        i++;
        Counter::count++;
    }

    while (j <= end)
    {
        temp[k] = holder_array->at(j);
        k++;
        j++;
        Counter::count++;
    }
    for (i = start; i <= end; i++)
    {
        holder_array->at(i) = temp[i - start];
    }
}

void mpartition(vector<double> *holder_array, int start, int end)
{
    int middle;
    if (start < end)
    {
        middle = (start + end) / 2;
        mpartition(holder_array, start, middle);
        mpartition(holder_array, middle + 1, end);
        merge_sort(holder_array, start, end, middle);
    }
}