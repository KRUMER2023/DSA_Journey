
def apown(a,n):
    if n==0:
        return 1
    x = apown(a,n//2)
    if(n&1)==1:
        return a*x*x
    else:
        return x*x 


print(apown(2, 3))
print(apown(10, 5))

