import  cv2;
def sort_contours(ctrs,diam,image):
    BB = [list(cv2.boundingRect(c)) for c in ctrs]
    tol = 0.7 * diam
    def sort(i):
        S = sorted(BB, key=lambda x: x[i])
        s = [b[i] for b in S]
        m = s[0]
        for b in S:
            if m - tol < b[i] < m or m < b[i] < m + tol:
                b[i] = m
            elif b[i] > m + diam:
                for e in s[s.index(m):]:
                    if e > m + diam:
                        m = e
                        break
        return sorted(set(s))
    xs = sort(0)
    ys = sort(1)
    (ctrs, BB) = zip(*sorted(zip(ctrs, BB), key=lambda b: b[1][1] * len(image) + b[1][0]))
    return ctrs, BB, xs, ys
    