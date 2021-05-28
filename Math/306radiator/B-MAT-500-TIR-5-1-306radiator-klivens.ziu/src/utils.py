#!/usr/bin/env python3

import sys
from decimal import localcontext, Decimal, ROUND_HALF_UP


def get_help():
    return """USAGE
\t./306radiator n ir jr [i j]

DESCRIPTION
\tn           size of the room
\t(ir, jr)    coordinates of the radiator
\t(i, j)      coordinates of a point in the room"""


def error_exit(message):
    print(message, file=sys.stderr)
    sys.exit(84)


def to_int(x):
    try:
        return int(x)
    except ValueError:
        error_exit('A value couldnt be converted to integer.')


def is_valid_coordinate(x, n):
    if not is_inside_walls(x, n):
        error_exit('Coord argument is invalid.')


def is_inside_walls(x, n):
    return 1 <= x <= n-2


def is_inside_bounds(x, n):
    return 0 <= x <= n-1


def parse_args(argv):
    n, ir, jr = argv[:3]
    n = to_int(n)
    if n <= 2:
        error_exit('Invalid room size.')
    ir = to_int(ir)
    is_valid_coordinate(ir, n)
    jr = to_int(jr)
    is_valid_coordinate(jr, n)
    if len(argv) == 5:
        i, j = argv[3:]
        i = to_int(i)
        is_valid_coordinate(i, n)
        j = to_int(j)
        is_valid_coordinate(j, n)
        return n, ir, jr, i, j
    else:
        return n, ir, jr


def round_up(x):
    with localcontext() as ctx:
        ctx.rounding = ROUND_HALF_UP
        n = Decimal(x)
        return str(n.quantize(Decimal('1.0')))
