#!/usr/bin/env python3
import sys


def new_array(n, value=0):
    return [value] * n


def error_exit(message):
    print(message, file=sys.stderr)
    sys.exit(84)
