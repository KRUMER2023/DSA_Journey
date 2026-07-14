Here are the most commonly used Python dictionary (`dict`) methods with short explanations and examples.

# Python `dict` Methods

| Method         | Description                   | Example                       |
| -------------- | ----------------------------- | ----------------------------- |
| `clear()`      | Removes all items             | `d.clear()`                   |
| `copy()`       | Returns shallow copy          | `d2 = d.copy()`               |
| `fromkeys()`   | Creates dict from keys        | `dict.fromkeys(['a','b'], 0)` |
| `get()`        | Returns value safely          | `d.get('key', default)`       |
| `items()`      | Returns key-value pairs       | `d.items()`                   |
| `keys()`       | Returns all keys              | `d.keys()`                    |
| `pop()`        | Removes specific key          | `d.pop('a')`                  |
| `popitem()`    | Removes last inserted item    | `d.popitem()`                 |
| `setdefault()` | Gets value or inserts default | `d.setdefault('x', 0)`        |
| `update()`     | Merges another dict           | `d.update({'a':1})`           |
| `values()`     | Returns all values            | `d.values()`                  |

---

# Detailed Examples

```python
d = {'a': 1, 'b': 2}
```

## 1. clear()

```python
d.clear()
print(d)
# {}
```

---

## 2. copy()

```python
d2 = d.copy()
```

---

## 3. fromkeys()

```python
x = dict.fromkeys(['a', 'b', 'c'], 0)
print(x)

# {'a': 0, 'b': 0, 'c': 0}
```

---

## 4. get()

```python
print(d.get('a'))
# 1

print(d.get('x', 'Not Found'))
# Not Found
```

---

## 5. items()

```python
print(d.items())

# dict_items([('a', 1), ('b', 2)])
```

---

## 6. keys()

```python
print(d.keys())

# dict_keys(['a', 'b'])
```

---

## 7. pop()

```python
d.pop('a')

print(d)
# {'b': 2}
```

---

## 8. popitem()

```python
d.popitem()

print(d)
# removes last item
```

---

## 9. setdefault()

```python
d.setdefault('c', 10)

print(d)
# {'a':1, 'b':2, 'c':10}
```

---

## 10. update()

```python
d.update({'c': 3})

print(d)
# {'a':1, 'b':2, 'c':3}
```

---

## 11. values()

```python
print(d.values())

# dict_values([1,2])
```

---

# Useful Dictionary Operations

## Add / Update Value

```python
d['x'] = 100
```

---

## Delete Key

```python
del d['x']
```

---

## Check Key Exists

```python
if 'a' in d:
    print("Exists")
```

---

## Loop Through Dictionary

```python
for key, value in d.items():
    print(key, value)
```

---

# Dictionary Comprehension

```python
squares = {x: x*x for x in range(5)}

print(squares)

# {0:0, 1:1, 2:4, 3:9, 4:16}
```

---

# Time Complexity (Important)

|Operation|Complexity|
|---|---|
|Access|O(1)|
|Insert|O(1)|
|Delete|O(1)|
|Search|O(1)|

---

# Special Notes

- Dictionaries are **mutable**
    
- Keys must be **immutable** (`str`, `int`, `tuple`)
    
- Dictionaries preserve insertion order (Python 3.7+)


# Increment Value without Error - Easy

## 1. Using `dict.get()` (Most Common)

```copy
d[key] = d.get(key, 0) + 1
```

```
d = {}
key = "apple"
d[key] = d.get(key, 0) + 1
print(d)
# {'apple': 1}
```

If key exists:

- returns current value

If key doesn't exist:

- returns `0`

## 2. Using `collections.defaultdict` (Best for Counting)

```
from collections import defaultdict

d = defaultdict(int)

d["apple"] += 1
d["apple"] += 1
d["banana"] += 1

print(d)

# {'apple': 2, 'banana': 1}
```

Why this is amazing:

- `int` automatically provides default value `0`
- No need to check keys manually

This is heavily used in:

- frequency counting
- graphs
- competitive programming
- ML preprocessing