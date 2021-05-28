#include "shell.hpp"
using namespace std;

int basic_shell_sort(vector<double> holder_array)
{
    int i, j, gap, temp, count = 0, size = holder_array.size();
    for (gap = size / 2; gap > 0; gap /= 2)
    {
        for (i = gap; i < size; i++)
        {
            temp = holder_array[i];
            count++;
            for (j = i; j >= gap && holder_array[j - gap] > temp; j -= gap)
            {
                holder_array[j] = holder_array[j - gap];
            }
            holder_array[j] = temp;
        }
    }
    return count;
}