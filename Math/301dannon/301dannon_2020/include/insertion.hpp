#ifndef INSERTION_HPP_
#define INSERTION_HPP_

#include <vector>
#include <iostream>

int basic_insertion_sort(std::vector<double> holder_array);
int insertion_sort(std::vector<double> *holder_array, int carried_count);
int improved_insertion_sort(std::vector<double> holder_array);
#endif