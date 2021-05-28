#include "insertion.hpp"
#include "selection.hpp"
using namespace std;

int basic_insertion_sort(vector<double> holder_array)
{
    return insertion_sort(&holder_array, 0);
}

int insertion_sort(vector<double> *holder_array, int carried_count) //carried_count added because this function gets called at improved_insertion_sort as well, we need to keep track of the total comparisons
{
    //bool repeat_count = true;
    int n = holder_array->size();
    int i, index_temp, count = 0;
    double current_value;
    /*
    for (i = 1; i < n; i++)
    {
        repeat_count = true;
        current_value = holder_array->at(i);
        index_temp = i;
        count++;
        while (index_temp > 0 && holder_array->at(index_temp - 1) > current_value)
        {
            holder_array->at(index_temp - 1) = holder_array->at(index_temp);
            index_temp--;
            repeat_count = false;
            count++;
        }
        holder_array->at(index_temp + 1) = current_value;
        //if (repeat_count)
        //{
        //count++;
        //}
    }*/
    for (i = 1; i < n; i++)
    {
        index_temp = i;
        count++;
        while ((index_temp > 0) && (holder_array->at(index_temp - 1) > holder_array->at(index_temp)))
        {
            count++;
            current_value = holder_array->at(index_temp - 1);
            holder_array->at(index_temp - 1) = holder_array->at(index_temp);
            holder_array->at(index_temp) = current_value;
            index_temp--;
        }
    }
    return count + carried_count;
}
int improved_insertion_sort(vector<double> holder_array)
{
    int start = 0;
    int end = holder_array.size() - 1;
    int carried_count = 0;
    while (start < end)
    {
        if (holder_array[start] > holder_array[end])
        {
            my_swap(&holder_array[start], &holder_array[end]);
        }
        start++; //dimensions start collapsing
        end--;
        carried_count++;
    }
    return insertion_sort(&holder_array, carried_count);
}