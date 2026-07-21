class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0
        c = 0
        mp = {0:-1}

        for j in range(n):
            c += -1 if nums[j] == 0 else 1

            if c in mp:
                ans = max(ans, j-mp[c])
            else:
                mp[c] = j
        return ans