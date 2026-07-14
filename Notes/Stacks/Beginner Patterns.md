
# The Bracket Matcher:

## The Smell Test (Identification)

- **Keywords & Constraints:** Look for words like "valid," "matching," "nested," "pairs," or "minimum additions to make valid." The input sizes for these strings are typically $10^4$ to $10^5$, which violently rejects $O(N^2)$ brute force approaches and demands a linear, single-pass $O(N)$ execution.
    

## The OA Mindset & Strategy

- **The Intuition:** Matching pairs resolve from the inside out. The most recently opened structure _must_ be the first one closed. This is the exact definition of Last-In-First-Out (LIFO).
    
- **The Strategy:** Traverse the sequence character by character. Push every "opener" onto the stack. When you encounter a "closer," peek at the top of the stack. If it's the exact matching opener, pop it and continue. If it's a mismatch, the sequence is instantly compromised.
    

## The Trap & The Rollout

- **The Trap:** The dual-threat of the _Dangling Closer_ and the _Leftover Opener_. A dangling closer (e.g., `]`) hits when the stack is already empty, triggering a fatal `IndexOutOfBounds` or `Pop from empty` exception. A leftover opener (e.g., `[[]`) survives until the end of the loop, falsely tricking you into thinking the string is valid because no mismatches were explicitly triggered during traversal.
    
- **The Rollout:** Always inject a strict `if stack is empty` check before attempting to match a closer. At the final return statement, never just return `True`; you must return whether the stack is entirely empty.
    

## LeetCode Application

### **LeetCode 20 - Valid Parentheses**
    
- **The Core Logic:** In Python, we use a hash map to link closers to their required openers, creating an $O(1)$ lookup that prevents `if/else` spaghetti code. In Java, we use an elite competitive programming trick: when we see an opener, we push its corresponding _closer_ onto the stack. Then, when we hit a closer in the string, we just check if it matches the popped element.
    
- **The Blueprint:**
    

Python


```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        # Map closers to openers
        bracket_map = {")": "(", "}": "{", "]": "["}
        
        for char in s:
            if char in bracket_map:
                # Trap Rollout: Provide a dummy value '#' if stack is empty
                top_element = stack.pop() if stack else '#'
                if bracket_map[char] != top_element:
                    return False
            else:
                stack.append(char)
                
        # Trap Rollout: Catch Leftover Openers
        return not stack
```

Java

```java
class Solution {
    public boolean isValid(String s) {
        // Deque is faster than the legacy Stack class in Java
        Deque<Character> stack = new ArrayDeque<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(')');
            } else if (c == '{') {
                stack.push('}');
            } else if (c == '[') {
                stack.push(']');
            } 
            // Trap Rollout: Empty stack check and mismatch check in one line
            else if (stack.isEmpty() || stack.pop() != c) {
                return false;
            }
        }
        
        // Trap Rollout: Catch Leftover Openers
        return stack.isEmpty();
    }
}
```

- **Complexity:**
    
    - **Time Complexity (TC):** $O(N)$ — We traverse the string exactly once. Push and pop operations are $O(1)$.
        
    - **Space Complexity (SC):** $O(N)$ — In the worst-case scenario (e.g., a string of all openers like `((((((`), every single character is pushed to the stack.
        

# The Collision Eraser:

## The Smell Test (Identification)

- **Keywords & Constraints:** Look for scenarios involving "adjacent," "collisions," "destroy," "merge," or "remove duplicates." If the problem asks you to resolve conflicts between elements that touch each other sequentially, and the input constraints are $10^4$ or $10^5$, a linear $O(N)$ stack approach is mandatory.
    

## The OA Mindset & Strategy

- **The Intuition:** Imagine you are walking through a narrow corridor. As you step forward, if the item you are holding reacts destructively with the item placed just behind you, they annihilate each other. This immediately exposes the _next_ item behind that one to a potential reaction. The stack perfectly models this "exposed surface."
    
- **The Strategy:** Iterate through the elements one by one. Treat the top of your stack as the "survivor" of all previous interactions. Before pushing the current element, check if it triggers a collision with the top of the stack. If it does, resolve the collision (usually by popping the loser).
    

## The Trap & The Rollout

- **The Trap:** The _Chain Reaction Failure_. Beginners often use a simple `if` statement to check for a collision. They pop the top element, push the new one, and move on. They forget that destroying the top element exposes the _next_ element in the stack, which might _also_ collide with the current element.
    
- **The Rollout:** Always use a `while` loop for collision checks. An incoming element must continuously battle the top of the stack until it either dies, the stack empties, or the collision conditions are no longer met.
    

### LeetCode Application

- **LeetCode 735 - Asteroid Collision** (The ultimate test of this pattern).
    
- **The Core Logic:** Asteroids moving right (positive) and asteroids moving left (negative) will collide if a positive one is on the stack and a negative one arrives. The larger absolute value survives. If they are equal, both explode.
    
- **The Blueprint:**
    

Python

```python
class Solution:
    def asteroidCollision(self, asteroids: list[int]) -> list[int]:
        stack = []
        
        for a in asteroids:
            # Trap Rollout: while loop handles chain-reaction explosions
            # Collision ONLY happens if top of stack is Right (+) and incoming is Left (-)
            while stack and a < 0 < stack[-1]:
                if stack[-1] < -a:
                    stack.pop()
                    continue # Incoming asteroid survives, keep checking the next one down
                elif stack[-1] == -a:
                    stack.pop() # Mutual destruction
                
                # If stack[-1] > -a, the incoming asteroid is destroyed.
                # If mutual destruction occurred, the incoming asteroid is also gone.
                break 
            else:
                # The 'else' attached to a 'while' in Python executes ONLY if the loop 
                # didn't hit a 'break' (meaning the incoming asteroid survived).
                stack.append(a)
                
        return stack
```

Java

```java
class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Deque<Integer> stack = new ArrayDeque<>();
        
        for (int a : asteroids) {
            boolean destroyed = false;
            
            // Trap Rollout: while loop handles chain-reaction explosions
            while (!stack.isEmpty() && a < 0 && stack.peek() > 0) {
                if (stack.peek() < -a) {
                    stack.pop();
                    continue; // Top destroyed, incoming survives, loop again
                } else if (stack.peek() == -a) {
                    stack.pop(); // Mutual destruction
                }
                
                // If we reach here, the incoming asteroid 'a' was destroyed
                destroyed = true; 
                break;
            }
            
            if (!destroyed) {
                stack.push(a);
            }
        }
        
        // Unload stack into array (Java requires manual array construction)
        int[] result = new int[stack.size()];
        for (int i = result.length - 1; i >= 0; i--) {
            result[i] = stack.pop();
        }
        
        return result;
    }
}
```

- **Complexity:**
    
    - **Time Complexity (TC):** $O(N)$ — Every asteroid is pushed to the stack at most once and popped at most once. Despite the inner `while` loop, the total number of operations scales linearly with the input.
        
    - **Space Complexity (SC):** $O(N)$ — In the worst-case scenario (e.g., all asteroids moving right), no collisions occur, and all $N$ elements are pushed to the stack.
        

Have you fully digested this? Shall we move to the next pattern on the ladder, or do you want to test this one?