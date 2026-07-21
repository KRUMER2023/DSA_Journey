# Binary Subarrays With Sum

## Intuition

We need to count the number of subarrays whose sum is exactly `goal`.

A direct approach would check every subarray and be too slow for large arrays. The key trick is to use a prefix sum:

- Let `prefix[i]` be the sum of the first `i` elements.
- A subarray from `l` to `r` has sum `prefix[r] - prefix[l-1]`.
- So we want `prefix[r] - prefix[l-1] = goal`.
- Rearranging gives `prefix[l-1] = prefix[r] - goal`.

That means for each current prefix sum, we only need to know how many earlier prefix sums equal `current_prefix - goal`.

## How the Code Works

1. Initialize:
   - `count = 0`
   - `prefix = 0`
   - `freq = {0: 1}` to represent one empty prefix sum before starting.

2. Traverse the array:
   - Add each element to `prefix`.
   - Compute `need = prefix - goal`.
   - If `need` exists in the hashmap, add its frequency to the answer.
   - Increase the frequency of the current `prefix`.

3. Return the total count.

## Why This Works

Every subarray ending at the current index is determined by a pair of prefix sums:

- one earlier prefix sum that matches `prefix - goal`
- the current prefix sum

The hashmap stores how many times each prefix sum has appeared so far, so each matching earlier prefix sum contributes one valid subarray.

## Complexity

- Time: `O(n)`
- Space: `O(n)`

This is efficient because each element is processed once, and the hashmap lookup is constant average time.
