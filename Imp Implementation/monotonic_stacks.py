
def nge(arr):
    n = len(arr)
    st = []
    res = [-1] * n

    for i in range(n):

        while st and arr[st[-1]] < arr[i]:
            idx = st.pop()
            res[idx] = arr[i]
        st.append(i)
    return res

def pge(arr):
    n = len(arr)
    st = []
    res = [-1] * n

    for i in range(n-1, -1, -1):

        while st and arr[st[-1]] < arr[i]:
            idx = st.pop()
            res[idx] = arr[i]
        st.append(i)
    return res

def nse(arr):
    n = len(arr)
    st = []
    res = [-1] * n

    for i in range(n):

        while st and arr[st[-1]] > arr[i]:
            idx = st.pop()
            res[idx] = arr[i]
        st.append(i)
    return res

def pse(arr):
    n = len(arr)
    st = []
    res = [-1] * n

    for i in range(n-1, -1, -1):

        while st and arr[st[-1]] > arr[i]:
            idx = st.pop()
            res[idx] = arr[i]
        st.append(i)
    return res



ip = [ 
    [1, 2, 3],
    [3, 2, 1],
    [2, 2, 2],
    [1, 5, 2],
    [10]
]

for arr in ip:

    print("for arr: ", arr)
    print(nge(arr))
    print(pge(arr))
    print(nse(arr))
    print(pse(arr))