#include "quick.hpp"
#include "selection.hpp"
using namespace std;

int qCounter::count{0}; //lets start count from 0

int basic_quick_sort(vector<double> holder_array)
{
    int end = holder_array.size() - 1;
    quick_sort(&holder_array, 0, end);
    /*for (auto q = 0; q <= end; q++)
    {
        cout << holder_array[q] << endl;
    }*/
    return qCounter::count;
}

int qpartition(vector<double> *holder_array, int start, int end)
{
    double pivot = holder_array->at(start), temp;
    int sep = start + 1, i;
    for (i = start + 1; i <= end; i++)
    {
        if (holder_array->at(i) < pivot)
        {
            if (i != sep)
            {
                temp = holder_array->at(sep);
                holder_array->at(sep) = holder_array->at(i);
                holder_array->at(i) = temp;
            }
            sep++;
        }
        qCounter::count++;
    }
    holder_array->at(start) = holder_array->at(sep - 1);
    holder_array->at(sep - 1) = pivot;

    return sep - 1;
}

void quick_sort(vector<double> *holder_array, int start, int end)
{
    int sep;
    if (start < end)
    {
        sep = qpartition(holder_array, start, end);
        quick_sort(holder_array, start, sep - 1);
        quick_sort(holder_array, sep + 1, end);
    }
}
