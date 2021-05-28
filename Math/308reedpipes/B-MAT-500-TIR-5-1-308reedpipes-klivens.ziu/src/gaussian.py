#!/usr/bin/env python3
import time
from utils import error_exit


def gauss(AugMat):
    n = len(AugMat)

    t1 = time.time()
    for i in range(0, n):
        if (time.time() - t1) > 5:
            error_exit('Force stopping gaussian elimination')
        maxrow = max_row(AugMat, i)
        swap_rows(AugMat, i, maxrow)
        zero_below(AugMat, i)
    return back_solve(AugMat)


def max_row(Mat, i):
    n = len(Mat)
    e = abs(Mat[i][i])
    maxr = i
    for k in range(i + 1, n):
        if abs(Mat[k][i]) > e:
            e = abs(Mat[k][i])
            maxr = k
    return maxr


def swap_rows(Mat, i, j):
    n = len(Mat)
    for k in range(i, n + 1):
        tmp = Mat[j][k]
        Mat[j][k] = Mat[i][k]
        Mat[i][k] = tmp


def zero_below(Mat, i):
    n = len(Mat)
    for k in range(i + 1, n):
        c = -Mat[k][i] / Mat[i][i]
        for j in range(i, n + 1):
            if i == j:
                Mat[k][j] = 0
            else:
                Mat[k][j] += c * Mat[i][j]


def back_solve(Mat):
    n = len(Mat)
    x = [0 for i in range(n)]
    for i in range(n - 1, -1, -1):
        x[i] = Mat[i][n] / Mat[i][i]
        for k in range(i - 1, -1, -1):
            Mat[k][n] -= Mat[k][i] * x[i]
    return x
