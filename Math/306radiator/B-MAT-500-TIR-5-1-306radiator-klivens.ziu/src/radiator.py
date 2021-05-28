#!/usr/bin/env python3

import sys
from utils import (
    get_help,
    error_exit,
    parse_args,
    round_up,
)
from matrix import (
    generate_equations,
    gaussian_solve,
    coordinates_to_index,
)


def main():
    argc = len(sys.argv)
    if argc == 2:
        if sys.argv[1] == '-h':
            print(get_help())
        else:
            error_exit('you done goofed boi.')
    elif argc == 4:
        n, ir, jr = parse_args(sys.argv[1:])
        A, Y = generate_equations(n, ir, jr)
        print(A)
        print()
        X = gaussian_solve(A, Y)
        print(X)
    elif argc == 6:
        n, ir, jr, i, j = parse_args(sys.argv[1:])
        A, Y = generate_equations(n, ir, jr)
        X = gaussian_solve(A, Y)
        index = coordinates_to_index(i, j, n)
        print(round_up(X[index][0]))
    else:
        error_exit('Incorrect number of arguments.')


if __name__ == '__main__':
    main()
