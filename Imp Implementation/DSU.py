
# DSU (Disjoint Set Union), also known as Union-Find, is a data structure designed to track a set of elements partitioned into multiple non-overlapping subsets.


class DSU:
    def __init__(self, n):

        # It is used to keep the current track of a root parent of the current node.
        self.parents = [i for i in range(n)]
        # The size error is used to keep the track of how many nodes included in the current connected components so that we can rank while merging.
        self.size = [1] * n
        # Keeping the track of a component we are having in current state.
        self.cnt = n


    def find(self, x):
        if self.parents[x] == x:
            return x
        self.parents[x] == self.find(self.parents[x])
        return self.parents[x]
    
    def union(self,a,b):
        root_a = self.find(a)
        root_b = self.find(b)

        if root_a == root_b:
            return False

        if self.size[root_a] > self.size[root_b]:
            self.parents[root_b] = root_a
            self.size[root_a] += self.size[root_b]
        else:
            self.parents[root_a] = root_b
            self.size[root_b] += self.size[root_a]
        self.cnt -= 1
        
        return True



dsu = DSU(5)
print(f"Initial isolated components: {dsu.cnt}")

# 2. Make Connections (Edges)
print("\nMerging 0 and 1...")
dsu.union(0, 1)

print("Merging 1 and 2...")
dsu.union(1, 2)

print("Merging 3 and 4...")
dsu.union(3, 4)

# 3. Check the total components after merges
print(f"\nTotal components after merges: {dsu.cnt}")

# 4. Test Connectivity (Are they in the same network?)
# We do this by checking if they share the same ultimate boss (root)
are_0_and_2_connected = dsu.find(0) == dsu.find(2)
are_0_and_4_connected = dsu.find(0) == dsu.find(4)

print(f"\nAre nodes 0 and 2 connected? {are_0_and_2_connected}")
print(f"Are nodes 0 and 4 connected? {are_0_and_4_connected}")


# Expected output:

# Initial isolated components: 5

# Merging 0 and 1...
# Merging 1 and 2...
# Merging 3 and 4...

# Total components after merges: 2

# Are nodes 0 and 2 connected? True
# Are nodes 0 and 4 connected? False