def get_spacing(diam,boundingBoxes,xs):
    def spacing(x):
        space = []
        coor = [b[x] for b in boundingBoxes]
        for i in range(len(coor) - 1):
            c = coor[i + 1] - coor[i]
            if c > diam // 2: space.append(c)
        return sorted(list(set(space)))
    spacingX = spacing(0)
    spacingY = spacing(1)
    m = min(spacingX)

    c = 0

    d1 = spacingX[0]
    d2 = 0
    d3 = 0

    for x in spacingX:
        if d2 == 0 and x > d1 * 1.3:
            d2 = x
        if d2 > 0 and x > d2 * 1.3:
            d3 = x
            break

    linesV = []
    prev = 0  # outside

    linesV.append(min(xs) - (d2 - diam) / 2)

    for i in range(1, len(xs)):
        diff = xs[i] - xs[i - 1]
        if i == 1 and d2 * 0.9 < diff:
            linesV.append(min(xs) - d2 - diam / 2)
            prev = 1
        if d1 * 0.8 < diff < d1 * 1.2:
            linesV.append(xs[i - 1] + diam + (d1 - diam) / 2)
            prev = 1
        elif d2 * 0.8 < diff < d2 * 1.1:
            linesV.append(xs[i - 1] + diam + (d2 - diam) / 2)
            prev = 0
        elif d3 * 0.9 < diff < d3 * 1.1:
            if prev == 1:
                linesV.append(xs[i - 1] + diam + (d2 - diam) / 2)
                linesV.append(xs[i - 1] + d2 + diam + (d1 - diam) / 2)
            else:
                linesV.append(xs[i - 1] + diam + (d1 - diam) / 2)
                linesV.append(xs[i - 1] + d1 + diam + (d2 - diam) / 2)
        elif d3 * 1.1 < diff:
            if prev == 1:
                linesV.append(xs[i - 1] + diam + (d2 - diam) / 2)
                linesV.append(xs[i - 1] + d2 + diam + (d1 - diam) / 2)
                linesV.append(xs[i - 1] + d3 + diam + (d2 - diam) / 2)
                prev = 0
            else:
                linesV.append(xs[i - 1] + diam + (d1 - diam) / 2)
                linesV.append(xs[i - 1] + d1 + diam + (d2 - diam) / 2)
                linesV.append(xs[i - 1] + d1 + d2 + diam + (d1 - diam) / 2)
                linesV.append(xs[i - 1] + d1 + d3 + diam + (d2 - diam) / 2)
                prev = 1

    linesV.append(max(xs) + diam * 1.5)
    if len(linesV) % 2 == 0:
        linesV.append(max(xs) + d2 + diam)

    return linesV, d1, d2, d3, spacingX, spacingY