# Add Two Numbers - Linked List

## Intuition
This problem represents a number as a linked list where each node stores one digit. The head of the list is the least significant digit, so the natural way to add two numbers is to process the lists from left to right, just like manual addition.

The key idea is to keep a carry value while summing digits from both lists. At each step:
- take the current digit from both linked lists (or `0` if one list ends),
- add them together along with the carry,
- place the last digit of the sum into the result list,
- update the carry for the next position.

## Approach
We use a dummy node to build the result linked list without worrying about the head node initially.

### Steps
1. Initialize `carry = 0`.
2. Create a dummy node and a pointer `temp` to keep track of the current tail of the result list.
3. While either list still has nodes or the carry is non-zero:
   - get the next digit from `l1` and `l2` (default to `0`),
   - compute `sm = x + y + carry`,
   - set `carry = sm // 10`,
   - create a new node with value `sm % 10` and connect it to the result list,
   - move both pointers forward.
4. Return `dummy.next`.

## Why this works
This mimics schoolbook addition from right to left. Since the linked lists store digits in reverse order, processing from the head is exactly the same as adding the least significant digits first. The carry propagation ensures that sums larger than 9 are handled correctly.

## Example
If we add:
- `2 -> 4 -> 3`
- `5 -> 6 -> 4`

The result becomes:
- `7 -> 0 -> 8`

because:
- $3 + 4 = 7$
- $4 + 6 = 10$ → write `0`, carry `1`
- $2 + 5 + 1 = 8$

## Complexity
- Time Complexity: $O(n)$ where $n$ is the length of the longer linked list.
- Space Complexity: $O(n)$ for the output linked list.
