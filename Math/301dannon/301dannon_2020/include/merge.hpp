#ifndef MERGE_HPP_
#define MERGE_HPP_

#include <vector>
#include <iostream>

class Counter // I used a class static method because keeping a count in recursive funcs is annoying
{
public:
    static int count;
};
int basic_merge_sort(std::vector<double> holder_array);
void merge_sort(std::vector<double> *holder_array, int start, int end, int middle);
void mpartition(std::vector<double> *holder_array, int start, int end);
#endif