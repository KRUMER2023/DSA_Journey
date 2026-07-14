
Java implicitly **extends** every class to **Object** class : `java.lang.Object`, it is a root class in java.
It give many methods for use like: `tostring()`, `equals()`, `copy()` .

If `equals()` is override by class its stays override for there child class als

## Inheritance :
Public A and Protected B

A ---inherit--> B
Then:
A ==> Public
B ==> Private

# Types of Association :

![[OOPs/Association.md#^group=fiiJQLH1|35%]]


![[OOPs/Association.md#^group=WnWtICNF|50%]]


# Interface :

- On inherit, must override the method.
- All methods are abstract in java.
- All states are final by default in java.
- Declare the class using **"interface"** keyword:
  `interface Animal{}`
  
- Use keyword **"implements"** in place of **"extends"** :+
  `class A implements B{}`
  
- Allows multiple inheritance in java, we override the method.
  `class A implements B,C{}`
