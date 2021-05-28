#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Create the graphs from the data gathered using matplotlib
"""

import matplotlib.pyplot as plt

titles = [
    "Selection Sort",
    "Insertion Sort",
    "Bubble Sort",
    "Quick Sort",
    "Merge Sort",
    "MinMax Selection Sort",
    "Improved Insertion Sort",
    "Improved Bubble Sort",
    "Shell Sort"
]

with open("chart", 'r') as file:
    for line in file:
        x_axis = []
        y_axis = []
        line = line.rstrip()
        sets = line.split(",")
        for set in sets:
            set = set.lstrip()
            if set == "":
                continue
            coor = set.split(" ")
            x_axis.append(int(coor[0]))
            y_axis.append(int(coor[1]))
        plt.plot(x_axis, y_axis)

plt.ylabel('Operations')
plt.xlabel('Number of elements')
plt.legend(titles, loc='upper left')
plt.savefig('comparison.png', dpi=199)
plt.show()
