## Disjoint Set Union (DSU)

Also known as Union-Find. It tracks a set of elements partitioned into a number of disjoint (non-overlapping) subsets.

### Operations
- **Find:** Determine which subset a particular element is in. This can be used for determining if two elements are in the same subset.
- **Union:** Join two subsets into a single subset.

We use **Path Compression** for Find and **Union by Size/Rank** to keep operations almost constant time `O(alpha(N))`.
