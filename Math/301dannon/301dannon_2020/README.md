# 301dannon

Klivens Ziu

The following algorithms are analysed, their time complexity is mostly mentioned about average case scenarios:

- Selection Sort, O((n^2-n)/2) time complexity, a basic quadratic algorithm that is preferred on smaller lists.

- MinMax Selection Sort, O(3/8(n^2)) time complexity, an algorithm where the minimum and maximum value are being searched separately, at the same time.

- Insertion Sort, O(n^2) time complexity, quadratic algorithm that builds the final array 1 item at a time.

- Improved Insertion Sort, O(n^2) time complexity, the array goes through a pre-sort process before getting fed to a basic Insertion Sort. The pre-sort process includes a simple comparison between the values at mirroring indexes, swapping if comparison condition is met. 

- Bubble Sort, O(n^2) time complexity, a simple algorithm that compares adjacent elements, and swaps them in an ascending order.

- Improved Bubble Sort, O(n^2) time complexity, exactly as Bubble sort, but including an early termination flag where the inner loop can avoid looking at the last n − 1 items when running for the n-th time.

- Merge Sort, O(n * log n) time complexity, an efficient divide & conquer algorithm, recursively splits the original list into sublists until sublist size is 1, then merges those sublists to produce a sorted list. 

- Quick Sort, O(n * log n) time complexity, an efficient divide & conquer algorithm, where a pivot is selected and then partitions are created based on the other elements being compared to this original pivot, recursively.

- Shell Sort, O(n * log n) time complexity for best case scenario, O(n^2) for worst case, still TBD for all scenarios and implementations. It is sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared.


As for the chart plotting, 10 arrays with different sizes and random elements are being fed to every algorithm, to produce 10 coordinate points that we can draw a line through. X is the number of elements in an array and Y is the number of operations performed to complete the sorts on that specific array.
A text file is generated with these XY values, and then read by a Python program using matplotlib to create the visualized chart.


Commands to run:
- make
- ./301dannon file


Commands to run in the /bonus folder:
- make
- ./301bonus file
- python3 graphs.py


A comparison.png will be created with the graphs (some line colors may appear different).