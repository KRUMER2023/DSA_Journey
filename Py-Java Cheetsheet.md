
# py↔Java 1-Liner DSA Initialization Cheat Sheet

| Purpose                 | Python                                 | Java                                                                                         |
| ----------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| Empty List              | `arr = []`                             | `ArrayList<Integer> arr = new ArrayList<>();`                                                |
| List with values        | `arr = [1,2,3]`                        | `ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(1,2,3));`                            |
| Integer Array           | `arr = [0]*5`                          | `int[] arr = new int[5];`                                                                    |
| 2D Array                | `grid = [[0]*m for _ in range(n)]`     | `int[][] grid = new int[n][m];`                                                              |
| String List             | `arr = ["a","b"]`                      | `ArrayList<String> arr = new ArrayList<>(Arrays.asList("a","b"));`                           |
| Empty Tuple             | `t = ()`                               | `Pair<Integer,Integer> p = new Pair<>(1,2);`                                                 |
| Dictionary / HashMap    | `mp = {}`                              | `HashMap<Integer,Integer> mp = new HashMap<>();`                                             |
| String HashMap          | `mp = {"a":1}`                         | `HashMap<String,Integer> mp = new HashMap<>();`                                              |
| Ordered Map             | `from collections import OrderedDict`  | `TreeMap<Integer,Integer> mp = new TreeMap<>();`                                             |
| Default Dictionary      | `mp = defaultdict(int)`                | `HashMap<Integer,Integer> mp = new HashMap<>();`                                             |
| Set                     | `s = set()`                            | `HashSet<Integer> set = new HashSet<>();`                                                    |
| Set with values         | `s = {1,2,3}`                          | `HashSet<Integer> set = new HashSet<>(Arrays.asList(1,2,3));`                                |
| Sorted Set              | `s = set(sorted(arr))`                 | `TreeSet<Integer> set = new TreeSet<>();`                                                    |
| Queue                   | `q = deque()`                          | `Queue<Integer> q = new LinkedList<>();`                                                     |
| Deque                   | `dq = deque()`                         | `Deque<Integer> dq = new ArrayDeque<>();`                                                    |
| Stack                   | `st = []`                              | `Stack<Integer> st = new Stack<>();`                                                         |
| Min Heap                | `pq = []`                              | `PriorityQueue<Integer> pq = new PriorityQueue<>();`                                         |
| Max Heap                | `pq = []`                              | `PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());`               |
| Graph Adjacency List    | `graph = [[] for _ in range(n)]`       | `ArrayList<Integer>[] graph = new ArrayList[n];`                                             |
| Boolean Array           | `vis = [False]*n`                      | `boolean[] vis = new boolean[n];`                                                            |
| Integer Frequency Array | `freq = [0]*100`                       | `int[] freq = new int[100];`                                                                 |
| Character Array         | `chars = list(s)`                      | `char[] chars = s.toCharArray();`                                                            |
| String Builder          | `res = []`                             | `StringBuilder sb = new StringBuilder();`                                                    |
| Infinite Integer        | `INF = float('inf')`                   | `int INF = Integer.MAX_VALUE;`                                                               |
| Long Infinite           | `INF = 10**18`                         | `long INF = Long.MAX_VALUE;`                                                                 |
| Mod Constant            | `MOD = 10**9 + 7`                      | `static final int MOD = 1000000007;`                                                         |
| Counter                 | `cnt = Counter(arr)`                   | `HashMap<Integer,Integer> cnt = new HashMap<>();`                                            |
| Pair List               | `pairs = [(1,2)]`                      | `ArrayList<Pair<Integer,Integer>> pairs = new ArrayList<>();`                                |
| Matrix List             | `mat = [[1,2],[3,4]]`                  | `int[][] mat = {{1,2},{3,4}};`                                                               |
| String Array            | `arr = ["a","b"]`                      | `String[] arr = {"a","b"};`                                                                  |
| Integer Stream List     | `arr = list(map(int,input().split()))` | `int[] arr = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();` |
| Clone List              | `b = a[:]`                             | `ArrayList<Integer> b = new ArrayList<>(a);`                                                 |
| Copy Array              | `b = arr.copy()`                       | `int[] b = arr.clone();`                                                                     |
| Reverse List            | `arr[::-1]`                            | `Collections.reverse(arr);`                                                                  |
| Sort List               | `arr.sort()`                           | `Collections.sort(arr);`                                                                     |
| Reverse Sort            | `arr.sort(reverse=True)`               | `arr.sort(Collections.reverseOrder());`                                                      |
| Join Strings            | `" ".join(arr)`                        | `String.join(" ", arr);`                                                                     |
| Split String            | `s.split()`                            | `s.split(" ");`                                                                              |
| Enumerate               | `for i,x in enumerate(arr)`            | `for(int i=0;i<arr.size();i++)`                                                              |
| Range Loop              | `for i in range(n)`                    | `for(int i=0;i<n;i++)`                                                                       |
| Lambda Function         | `lambda x:x*x`                         | `x -> x*x`                                                                                   |
| Custom Comparator       | `key=lambda x:x[0]`                    | `(a,b) -> a[0]-b[0]`                                                                         |
| Read Integer            | `n = int(input())`                     | `int n = sc.nextInt();`                                                                      |
| Read String             | `s = input()`                          | `String s = sc.next();`                                                                      |
| Fast Input              | `sys.stdin.readline`                   | `BufferedReader br = new BufferedReader(new InputStreamReader(System.in));`                  |
| Print                   | `print(x)`                             | `System.out.println(x);`                                                                     |
| Ternary Operator        | `a if cond else b`                     | `cond ? a : b`                                                                               |
| Membership Check        | `x in s`                               | `set.contains(x)`                                                                            |
| Append List             | `arr.append(x)`                        | `arr.add(x);`                                                                                |
| Pop Last                | `arr.pop()`                            | `arr.remove(arr.size()-1);`                                                                  |
| Queue Push              | `q.append(x)`                          | `q.offer(x);`                                                                                |
| Queue Pop               | `q.popleft()`                          | `q.poll();`                                                                                  |
| Heap Push               | `heapq.heappush(pq,x)`                 | `pq.offer(x);`                                                                               |
| Heap Pop                | `heapq.heappop(pq)`                    | `pq.poll();`                                                                                 |
| Heap Top                | `pq[0]`                                | `pq.peek();`                                                                                 |
| Map Insert              | `mp[k]=v`                              | `mp.put(k,v);`                                                                               |
| Map Get                 | `mp[k]`                                | `mp.get(k);`                                                                                 |
| Map Default             | `mp.get(k,0)`                          | `mp.getOrDefault(k,0);`                                                                      |
| Set Insert              | `s.add(x)`                             | `set.add(x);`                                                                                |
| Set Remove              | `s.remove(x)`                          | `set.remove(x);`                                                                             |
| Length                  | `len(arr)`                             | `arr.size()`                                                                                 |
| String Length           | `len(s)`                               | `s.length()`                                                                                 |
| Max Value               | `max(arr)`                             | `Collections.max(arr);`                                                                      |
| Min Value               | `min(arr)`                             | `Collections.min(arr);`                                                                      |
| Sum                     | `sum(arr)`                             | `arr.stream().mapToInt(Integer::intValue).sum();`                                            |
| Absolute                | `abs(x)`                               | `Math.abs(x);`                                                                               |
| Square Root             | `math.sqrt(x)`                         | `Math.sqrt(x);`                                                                              |
| Power                   | `pow(a,b)`                             | `Math.pow(a,b);`                                                                             |
| Ceiling                 | `math.ceil(x)`                         | `Math.ceil(x);`                                                                              |
| Floor                   | `math.floor(x)`                        | `Math.floor(x);`                                                                             |

---

# Most Important Imports in Java

```java
import java.util.*;
import java.io.*;
```

---

# Most Used Java DSA Initializations

```java
ArrayList<Integer> arr = new ArrayList<>();

HashMap<Integer,Integer> mp = new HashMap<>();

HashSet<Integer> set = new HashSet<>();

Queue<Integer> q = new LinkedList<>();

Deque<Integer> dq = new ArrayDeque<>();

Stack<Integer> st = new Stack<>();

PriorityQueue<Integer> minHeap = new PriorityQueue<>();

PriorityQueue<Integer> maxHeap =
    new PriorityQueue<>(Collections.reverseOrder());

TreeMap<Integer,Integer> tm = new TreeMap<>();

TreeSet<Integer> ts = new TreeSet<>();
```