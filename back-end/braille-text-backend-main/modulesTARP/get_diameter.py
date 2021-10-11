# done
from collections import Counter
import cv2


def get_diameter(ctrs):
    boundingBoxes = [list(cv2.boundingRect(c)) for c in ctrs]
    c = Counter([i[2] for i in boundingBoxes])
    mode = c.most_common(1)[0][0]
    if mode > 1:
        diam = mode
    else:
        diam = c.most_common(2)[1][0]
    return diam
