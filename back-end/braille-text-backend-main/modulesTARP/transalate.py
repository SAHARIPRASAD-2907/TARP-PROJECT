import numpy as np
import re;
def translate(letters):
    alpha = {'a': '1', 'b': '13', 'c': '12', 'd': '124', 'e': '14', 'f': '123',
             'g': '1234', 'h': '134', 'i': '23', 'j': '234', 'k': '15',
             'l': '135', 'm': '125', 'n': '1245', 'o': '145', 'p': '1235',
             'q': '12345', 'r': '1345', 's': '235', 't': '2345', 'u': '156',
             'v': '1356', 'w': '2346', 'x': '1256', 'y': '12456', 'z': '1456',
             '#': '2456', '^': '6', ',': '3', '.': '346', '\"': '356', '^': '26',
             ':': '34', '\'': '5'}

    nums = {'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5', 'f': '6', 'g': '7', 'h': '8', 'i': '9', 'j': '0'}

    braille = {v: k for k, v in alpha.items()}

    letters = np.array([np.array(l) for l in letters])

    ans = ''

    for r in range(0, len(letters), 3):
        for c in range(0, len(letters[0]), 2):
            f = letters[r:r + 3, c:c + 2].flatten()
            f = ''.join([str(i + 1) for i, d in enumerate(f) if d == 1])
            if f == '6': f = '26'
            if not f:
                if ans[-1] != ' ': ans += ' '
            elif f in braille.keys():
                ans += braille[f]
            else:
                ans += '?'
        if ans[-1] != ' ': ans += ' '

    # replace numbers
    def replace_nums(m):
        return nums.get(m.group('key'), m.group(0))

    ans = re.sub('#(?P<key>[a-zA-Z])', replace_nums, ans)

    # capitalize
    def capitalize(m):
        return m.group(0).upper()[1]

    ans = re.sub('\^(?P<key>[a-zA-Z])', capitalize, ans)

    return ans