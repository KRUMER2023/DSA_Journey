## Monotonic Stacks

A Monotonic Stack is simply a stack that maintains a monotonic order (strictly increasing or decreasing).

### Applications
Used extensively to find:
- Next Greater Element (NGE)
- Previous Greater Element (PGE)
- Next Smaller Element (NSE)
- Previous Smaller Element (PSE)

### Why?
It reduces the time complexity of these problems from `O(N^2)` (nested loops) to `O(N)`. Each element is pushed and popped at most once.
