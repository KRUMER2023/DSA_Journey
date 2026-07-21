# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        
        c  = 0
        dum = ListNode(-1)
        tem = dum

        while l1 or l2 or c :
            x = l1.val if l1 else 0
            y = l2.val if l2 else 0
            
            sm = (x + y + c)
            c = sm // 10

            tem.next = ListNode((sm%10))
            tem = tem.next
            
            if l1:
                l1 = l1.next

            if l2 :
                l2 = l2.next
        
        return dum.next
