#include "main.hpp"
#include "extra.hpp"

long factorial(int a)
{
    if (a == 0)
    {
        return 1;
    }
    else
    {
        return (a * factorial(a - 1));
    }
}

double binomial_nums(int num, int k)
{
    return factorial(num) / static_cast<double>(factorial(k) * factorial(num - k));
}

double calc(int num, double xy, int k)
{
    return (pow((xy / num), k) * pow(1 - (xy / num), num - k));
}

double bezier(int num, int coords[50][50], double x, double y)
{
    double temp = 0;
    for (int m = 0; m <= num; m++)
    {
        for (int k = 0; k <= num; k++)
        {
            temp += binomial_nums(num, m) * binomial_nums(num, k) * calc(num, x, m) * calc(num, y, k) * coords[m][k];
        }
    }
    return temp;
}

bool total_solve(int num, const std::string &file, double x, double y)
{
    double final = 0;
    int coords[50][50] = {{0}};

    if (!file_parser(file, coords))
    {
        return false;
    }
    final = bezier(num - 1, coords, x, y);
    std::cout << std::fixed << std::setprecision(2) << final << std::endl;
    return true;
}