#!/usr/bin/env python3

from fractions import Fraction

from utils import (
    is_inside_walls,
    is_inside_bounds,
    round_up,
)
from gauss import (
    gauss,
)


class C_Matrix(object):

    def __init__(self, size, data=None):
        self.size = size
        if data is None:
            self._data = [[0 for _ in range(size)] for _ in range(size)]
        else:
            self._data = data

    def row_insert(self, row, index):
        self._data[index] = row

    def get_2d(self):
        return self._data

    def __str__(self):
        return '\n'.join('\t'.join(map(str, row)) for row in self._data)

    def __getitem__(self, key):
        return self._data[key]


class C_SparseMatrix(C_Matrix):

    def __init__(self, size):
        self.size = size
        self._data = {}

    def row_insert(self, row, index):
        if row == [0]:
            pass
        else:
            self._data[index] = row

    def get_2d(self):
        mat = [[0] for _ in range(self.size)]
        for index, row in self._data.items():
            mat[index] = row
        return mat

    def __str__(self):
        mat = [[0] for _ in range(self.size)]
        for index, row in self._data.items():
            mat[index] = row
        return '\n'.join('\t'.join(map(lambda x: round_up(x), row)) for row in mat)

    def __getitem__(self, key):
        return self._data[key] if key in self._data else 0


def index_to_coordinates(num, n):
    i, j = (num // n, num % n)
    return i, j


def coordinates_to_index(i, j, n):
    num = i*n + j
    return num


def generate_equations(n, ir, jr):
    A = C_Matrix(n**2)
    Y = C_SparseMatrix(n**2)
    for num in range(n**2):
        left_coeffs, right_coeffs = get_equation_coefficients(num, n, ir, jr)
        A.row_insert(left_coeffs, num)
        Y.row_insert(right_coeffs, num)
    return A, Y


def get_equation_coefficients(num, n, ir, jr):
    left = [0] * n**2
    i, j = index_to_coordinates(num, n)
    if not (is_inside_walls(i, n) and is_inside_walls(j, n)):
        # wall
        left[num] = 1
    else:
        # not a wall
        add_term(left, i-1, j, n, 4)  # x minus
        add_term(left, i, j-1, n, 4)  # y_minus
        add_term(left, i, j, n, -16)  # x_y
        add_term(left, i+1, j, n, 4)  # x_plus
        add_term(left, i, j+1, n, 4)  # y_plus

    if i == ir and j == jr:
        # -300 at radiator
        right = [-300]
    else:
        # null point
        right = [0]
    return left, right


def add_term(coeffs, i, j, n, coeff):
    if is_inside_bounds(i, n) and is_inside_bounds(j, n):
        num = coordinates_to_index(i, j, n)
        coeffs[num] = coeff


def gaussian_solve(A, Y):
    X = C_SparseMatrix(len(A[0]))

    n = Y.size
    M = [[0 for j in range(n+1)] for i in range(n)]
    for i in range(0, n):
        row = map(Fraction, A.get_2d()[i])
        for j, el in enumerate(row):
            M[i][j] = el
    for i in range(0, n):
        augmentedRow = list(map(Fraction, Y.get_2d()[i]))
        M[i][n] = augmentedRow[0]

    _X = gauss(M)

    for i, e in enumerate(_X):
        x = e.numerator / e.denominator
        X.row_insert([x], i)
    return X
