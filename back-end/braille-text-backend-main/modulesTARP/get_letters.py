def get_letters(boundingBoxes,spacingY,diam,linesV,showID=False):
    Bxs = list(boundingBoxes)
    Bxs.append((100000, 0))

    dots = [[]]
    for y in sorted(list(set(spacingY))):
        if y > 1.3 * diam:
            minYD = y * 1.5
            break
    for b in range(len(Bxs) - 1):
        if Bxs[b][0] < Bxs[b + 1][0]:
            if showID:
                dots[-1].append((b, Bxs[b][0:2]))
            else:
                dots[-1].append(Bxs[b][0])
        else:
            if abs(Bxs[b + 1][1] - Bxs[b][1]) < minYD:
                if showID:
                    dots[-1].append((b, Bxs[b][0:2]))
                else:
                    dots[-1].append(Bxs[b][0])
                dots.append([])
            else:
                if showID:
                    dots[-1].append((b, Bxs[b][0:2]))
                else:
                    dots[-1].append(Bxs[b][0])
                dots.append([])
                if len(dots) % 3 == 0 and not dots[-1]:
                    dots.append([])

    #   for d in dots: print(d)

    letters = []

    count = 0

    for r in range(len(dots)):
        if not dots[r]:
            letters.append([0 for _ in range(len(linesV) - 1)])
            continue

        else:
            letters.append([])
            c = 0
            i = 0
            while i < len(linesV) - 1:
                if c < len(dots[r]):
                    if linesV[i] < dots[r][c] < linesV[i + 1]:
                        letters[-1].append(1)
                        c += 1
                    else:
                        letters[-1].append(0)
                else:
                    letters[-1].append(0)
                i += 1
    for l in range(len(letters)):
        if l % 3 == 0: print()
        print(letters[l])
    print()

    return letters