#!/usr/bin/env python3
import sys
import os
from utils import error_exit
from spline import interpolate


HELP_MSG = """USAGE
    ./308reedpipes r0 r5 r10 r15 r20 n

DESCRIPTION
    r0      radius (in cm) of pipe at the 0cm abscissa
    r5      radius (in cm) of pipe at the 5cm abscissa
    r10     radius (in cm) of pipe at the 10cm abscissa
    r15     radius (in cm) of pipe at the 15cm abscissa
    r20     radius (in cm) of pipe at the 20cm abscissa
    n       number of points needed to display the radius"""


def get_help():
    return HELP_MSG


def parse_args(argv):
    ret = argv[1:]
    ret = list(map(to_float, ret))
    ret[-1] = to_int(ret[-1])
    if not all(0 <= x for x in ret):
        error_exit('Arguments cannot contain negative numbers'.format(ret))
    r0, r5, r10, r15, r20, n = ret
    radii = [r0, r5, r10, r15, r20]
    if n < 5:
        error_exit(
            'Invalid number of points for display')
    if not all(0 < x for x in radii):
        error_exit(
            'The radius cannot be 0'.format(radii))
    return r0, r5, r10, r15, r20, n


def to_float(x):
    try:
        return float(x)
    except ValueError:
        error_exit('Float conversion failed: %s' % x)


def to_int(x):
    try:
        return int(x)
    except ValueError:
        error_exit('Integer conversion failed: %s' % x)


def print_vector(vector):
    print('vector result: ', end='')
    numbers = (format(x, '.1f') for x in vector)
    print('[', end='')
    print(', '.join(numbers), end='')
    print(']', end='')
    print()


def print_interpolation(interpolation):
    for abscissa, radius in interpolation:
        print('abscissa: {:.1f} cm\tradius: {:.1f} cm'.format(
            abscissa, radius))


def main():
    argc = len(sys.argv)
    if argc == 2:
        if sys.argv[1] == '-h':
            print(get_help())
        else:
            error_exit('Invalid arguments')
    elif argc == 7:
        r0, r5, r10, r15, r20, n = parse_args(sys.argv)
        points = [(0, r0), (5, r5), (10, r10), (15, r15), (20, r20)]
        vec, interpolation = interpolate(points, n)
        print_vector(vec)
        print_interpolation(interpolation)
    else:
        error_exit(
            'Invalid arguments')


if __name__ == "__main__":
    main()
