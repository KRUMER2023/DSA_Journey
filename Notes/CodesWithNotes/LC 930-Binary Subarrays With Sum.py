class Solution:
    def numSubarraysWithSum(self, nums, goal) -> int:
        
        n = len(nums)
        c = 0
        mp = {0:1}

        pre = 0
        for x in nums:
            pre += x

            need = pre - goal
            
            if need in mp:
                c += mp[need]
                # mp[need] += 1
            
            mp[pre] = (mp.get(pre,0) + 1)

        return c