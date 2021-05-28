#!/usr/bin/env python3

import time
from utils import error_exit


def max_row(Matrix, i):
    n = len(Matrix)
    e = abs(Matrix[i][i])
    maxrow = i
    for k in range(i + 1, n):
        if abs(Matrix[k][i]) > e:
            e = abs(Matrix[k][i])
            maxrow = k
    return maxrow


def swap_rows(Matrix, i, j):
    n = len(Matrix)
    for k in range(i, n + 1):
        tmp = Matrix[j][k]
        Matrix[j][k] = Matrix[i][k]
        Matrix[i][k] = tmp


def zero_below(Matrix, i):
    n = len(Matrix)
    for k in range(i + 1, n):
        c = -Matrix[k][i] / Matrix[i][i]
        for j in range(i, n + 1):
            if i == j:
                Matrix[k][j] = 0
            else:
                Matrix[k][j] += c * Matrix[i][j]


def back_solve(Matrix):
    n = len(Matrix)
    x = [0 for i in range(n)]
    for i in range(n - 1, -1, -1):
        x[i] = Matrix[i][n] / Matrix[i][i]
        for k in range(i - 1, -1, -1):
            Matrix[k][n] -= Matrix[k][i] * x[i]
    return x


def gauss(AugMatrix):
    n = len(AugMatrix)
    t1 = time.time()
    for i in range(0, n):
        if (time.time() - t1) > 30:
            error_exit('Max runtime exceeded,force stopping.')
        maxrow = max_row(AugMatrix, i)
        swap_rows(AugMatrix, i, maxrow)
        zero_below(AugMatrix, i)
    return back_solve(AugMatrix)
