
def nge_pge(arr):
    n = len(arr)
    st = []
    nge = [-1] * n
    pge = [-1] * n

    for i in range(n):

        while st and arr[st[-1]] < arr[i]:
            idx = st.pop()
            nge[idx] = arr[i]
        
        if st and arr[st[-1]] != arr[i]:
            pge[i] = arr[st[-1]]

        st.append(i)
    return [ nge, pge ]


ip = [ 
    [1, 2, 3],
    [3, 2, 1],
    [2, 2, 2],
    [1, 5, 2],
    [10]
]

for arr in ip:

    print("for arr: ", arr)
    res = nge_pge(arr)
    print(res[0])
    print(res[1])
    print()