## Approach

To calculate `a^n` recursively, we use the method of exponentiation by squaring. This brings the time complexity down from `O(n)` to `O(log n)`.

### Logic
- **Base Case:** If `n == 0`, return `1`.
- **Recursive Step:** Calculate `x = apown(a, n // 2)`.
- If `n` is odd (i.e. `n & 1 == 1`), the answer is `a * x * x`.
- If `n` is even, the answer is just `x * x`.
