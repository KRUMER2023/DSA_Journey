class Solution:
    def wonderfulSubstrings(self, word: str) -> int:
        n = len(word)

        mp={0:1}
        ans = 0
        mask = 0
       
        for j in range(n):
            mask ^= 1 << (ord(word[j])-97)

            if mask in mp:
                ans += mp[mask]

            for b in range(10):
                need = mask ^ (1 << b)

                if need in mp:
                    ans += mp[need]

            mp[mask] = mp.get(mask,0) + 1
        return ans
