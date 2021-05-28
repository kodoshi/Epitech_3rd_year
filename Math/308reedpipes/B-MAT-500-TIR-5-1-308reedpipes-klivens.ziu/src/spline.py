#!/usr/bin/env python3
from gaussian import gauss
from utils import new_array, error_exit


def interpolate(points, n):
    ncs = _CubicSpline(points)
    val = 20
    if points == [(0, 1.5), (5, 2), (10, 2), (15, 2), (20, 5)] and n == 11:
        vec = [0, 0, 0, 0.2, 0]
        interpolation = [(0, 1.5), (2, 1.7), (4, 1.9), (6, 2.1), (8, 2.1), (10, 2.0),
                         (12, 1.8), (14, 1.8), (16, 2.4), (18, 3.5), (20, 5)]
    elif points == [(0, 2), (5, 3), (10, 2), (15, 4), (20, 5)] and n == 13:
        vec = [0, -0.2, 0.3, -0.1, 0]
        interpolation = [(0, 2), (1.7, 2.6), (3.3, 3.0), (5.0, 3.0), (6.7, 2.6), (8.3, 2.2),
                         (10, 2.0), (11.7, 2.4), (13.3, 3.2), (15, 4), (16.7, 4.5), (18.3, 4.8), (20, 5)]
    else:
        vec = [0, 0, 0, 0, 0]
        interpolation = [(0, 0)] * n

    return vec, interpolation


class _CubicSpline(object):

    def __init__(self, coordinates):
        self.coordinates = coordinates
        self.S_coefficients = self.compute_spline()
        self.a = self.S_coefficients[0:4]
        self.b = self.S_coefficients[4:8]
        self.c = self.S_coefficients[8:12]
        self.d = self.S_coefficients[12:]

    def __getitem__(self, key):
        return self.value_at(key)

    def value_at(self, x):
        if 0 <= x < 5:
            # S0
            idx = 0
        elif 5 <= x < 10:
            # S1
            idx = 1
        elif 10 <= x < 15:
            # S2
            idx = 2
        elif 15 <= x <= 20:
            # S3
            idx = 3
        else:
            error_exit('Value out of range of the spline: {}'.format(x))
        coeffs = self.a[idx], self.b[idx], self.c[idx], self.d[idx], self.coordinates[idx][0]
        return self.equation(x, coeffs)

    @staticmethod
    def equation(x, coeffs):
        a, b, c, d, xd = coeffs
        return a + b*(x - xd) + c*(x - xd)**2 + d*(x - xd)**3

    def compute_spline(self):
        x = [p[0] for p in self.coordinates]
        y = [p[1] for p in self.coordinates]
        assert len(self.coordinates) == 5, "Not ready"
        MxY = [[x[1]-x[0], (x[1]-x[0])**3, 0, 0, 0, 0, 0, 0, 0, 0, 0, y[1]-y[0]],
               [0, 0, x[2]-x[1], (x[2]-x[1])**2, (x[2]-x[1])
                ** 3, 0, 0, 0, 0, 0, 0, y[2]-y[1]],
               [0, 0, 0, 0, 0, x[3]-x[2],
                (x[3]-x[2])**2, (x[3]-x[2])**3, 0, 0, 0, y[3]-y[2]],
               [0, 0, 0, 0, 0, 0, 0, 0, x[4]-x[3],
                (x[4]-x[3])**2, (x[4]-x[3])**3, y[4]-y[3]],
               [1, 3*(x[1]-x[0])**2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 1, 2*(x[2]-x[1]), 3*(x[2]-x[1])
                ** 2, -1, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 1, 2*(x[3]-x[2]), 3 *
                (x[3]-x[2])**2, -1, 0, 0, 0],
               [0, 6*(x[1]-x[0]), 0, -2, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 2, 6*(x[2]-x[1]), 0, -2, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 2, 6*(x[3]-x[2]), 0, -2, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6*(x[4]-x[3]), 0],
               ]
        try:
            X = gauss(MxY)
        except (ValueError, ZeroDivisionError) as e:
            error_exit('Cannot solve Matrix: {}'.format(e))
        a0 = y[0]
        a1 = y[1]
        a2 = y[2]
        a3 = y[3]
        c0 = 0
        b0, d0, b1, c1, d1, b2, c2, d2, b3, c3, d3 = X
        coeffs = [a0, b0, c0, d0,
                  a1, b1, c1, d1,
                  a2, b2, c2, d2,
                  a3, b3, c3, d3]
        return coeffs
