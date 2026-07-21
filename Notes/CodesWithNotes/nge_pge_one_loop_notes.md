# Next Greater Element (NGE) and Previous Greater Element (PGE) in One Loop

## Intuition
This implementation finds both the Next Greater Element (NGE) and Previous Greater Element (PGE) for every element in a single traversal.

- Use a monotonic decreasing stack to track indices whose NGE is not yet found.
- When the current element is greater than the stack top, the current element becomes the NGE for the popped index.
- After processing NGE updates, the stack top (if any) becomes the PGE for the current element if it is not equal.

## How it works
1. Initialize two arrays, `nge` and `pge`, to `-1` for all positions.
2. Iterate through the array while maintaining a stack of indices in descending order by value.
3. For each position `i`:
   - Pop indices from the stack while the current value is greater than the value at the stack top.
   - Assign the current value as NGE for each popped index.
   - If the stack still has indices and the top value differs from the current value, assign that top value as the PGE for the current index.
   - Push the current index onto the stack.

## Complexity
- Time Complexity: `O(n)` because each index is pushed and popped at most once.
- Space Complexity: `O(n)` due to the stack and result arrays.
