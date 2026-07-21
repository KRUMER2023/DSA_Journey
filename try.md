# Binary Search Algorithm

Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.

## How it works
1. **Start** with the middle element of the sorted array.
2. **Compare** the target value to the middle element.
3. If the target value is **equal** to the middle element, the search is successful.
4. If the target value is **less** than the middle element, repeat the search on the left half.
5. If the target value is **greater** than the middle element, repeat the search on the right half.
6. **Repeat** until the target is found or the search interval is empty.

## Complexity
- **Time Complexity:** $O(\log n)$
- **Space Complexity:** $O(1)$ (for iterative implementation)