import cv2;
def get_circles(diam,ctrs):
    questionCtrs = []
    for c in ctrs:
        (x, y, w, h) = cv2.boundingRect(c)
        ar = w / float(h)
        if diam * 0.8 <= w <= diam * 1.2 and 0.8 <= ar <= 1.2:
            questionCtrs.append(c)
    return questionCtrs