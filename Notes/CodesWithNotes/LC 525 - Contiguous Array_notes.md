# LC 525 - Contiguous Array

## Intuition
This problem asks for the longest subarray with an equal number of `0`s and `1`s.

A direct brute-force check would be too slow, so we use a prefix-sum trick.

We transform the array as:
- `0 -> -1`
- `1 -> +1`

Then, for every prefix sum, we want to know the earliest position where the same balance occurred again. If the same prefix sum appears at two different indices, the subarray between them has equal counts of `0` and `1`.

## Why This Works
Maintain a running balance `c` while scanning the array:
- If we see `0`, subtract `1`
- If we see `1`, add `1`

If the current balance `c` has been seen before at index `mp[c]`, then the subarray from `mp[c] + 1` to the current index has equal numbers of `0` and `1`.

We update the answer with the maximum length found so far.

## Standard Pattern
This is a classic prefix-sum + hashmap pattern:
- store the first occurrence of each prefix sum
- use the difference between positions to compute the longest valid subarray

## Time Complexity
- O(n)

## Space Complexity
- O(n)
