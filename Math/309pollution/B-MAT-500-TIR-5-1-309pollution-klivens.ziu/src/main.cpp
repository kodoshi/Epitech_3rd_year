#include "main.hpp"
#include "extra.hpp"
using namespace std;

bool is_digit(const string &str)
{
    string::const_iterator it = find_if(str.begin(), str.end(), [](const char a) { return !isdigit(a); });
    return it == str.end();
}

bool is_float(char *check)
{
    if (strcmp(check, ".") == 0)
    {
        return false;
    }

    for (size_t i = 0; check[i] != '\0'; i++)
    {
        if (((check[i] < '0' || check[i] > '9') && check[i] != '.'))
        {
            return false;
        }
    }
    return true;
}

bool fukked(char *argv[])
{
    int num = atoi(argv[1]);
    int x = atoi(argv[3]);
    int y = atoi(argv[4]);

    if (!is_digit(argv[1]) || !is_float(argv[3]) || !is_float(argv[4]))
    {
        cout << "Incorrect arguments." << endl;
        return true;
    }
    if (num < 2 || x > num - 1 || y > num - 1)
    {
        cout << "Arguments not in range of each other" << endl;
        return true;
    }
    return false;
}

int main(int argc, char *argv[])
{
    string help = "-h";
    int num = 0;
    double x = 0;
    double y = 0;

    if (argc == 2 && argv[1] == help)
    {
        cout << "USAGE\n"
             << "   ./309pollution n file x y\n"
             << "DESCRIPTION\n"
             << "   n       number of points on the grid axis\n"
             << "   file    csv file containing the data points x;y;p\n"
             << "   x       abscissa of the point whose pollution level we want to know\n"
             << "   y       ordinate of the point whose pollution level we want to know" << endl;
        exit(0);
    }
    else if (argc == 5)
    {
        if (fukked(argv))
        {
            exit(84);
        }

        num = atoi(argv[1]);
        x = atof(argv[3]);
        y = atof(argv[4]);

        if (!total_solve(num, argv[2], x, y))
        {
            exit(84);
        }
    }
    else
    {
        cout << "Incorrect usage." << endl;
        exit(84);
    }
    return 0;
}