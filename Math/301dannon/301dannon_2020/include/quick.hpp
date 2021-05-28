#ifndef QUICK_HPP_
#define QUICK_HPP_

#include <vector>
#include <iostream>

class qCounter // I used a class static method because keeping a count in recursive funcs is annoying
{
public:
    static int count;
};
int basic_quick_sort(std::vector<double> holder_array);
void quick_sort(std::vector<double> *holder_array, int start, int end);
int qpartition(std::vector<double> *holder_array, int start, int end);

#endif