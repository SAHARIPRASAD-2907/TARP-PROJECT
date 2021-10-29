import cv2;
import imutils;
import numpy as np
import matplotlib.pyplot as plt


def get_image(url, iter=2, width=None):
    image = cv2.imread(url)
    if width:
        image = imutils.resize(image, width)
    ans = image.copy()
    accumEdged = np.zeros(image.shape[:2], dtype="uint8")
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 75, 200)
    accumEdged = cv2.bitwise_or(accumEdged, edged)
    ctrs = cv2.findContours(
        edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    ctrs = imutils.grab_contours(ctrs)
    docCnt = None
    if len(ctrs) > 0:
        ctrs = sorted(ctrs, key=cv2.contourArea, reverse=True)
        for c in ctrs:
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.02 * peri, True)
            if len(approx) == 4:
                docCnt = approx
                break
    paper = image.copy()
    thresh = cv2.threshold(
        gray, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
    kernel = np.ones((5, 5), np.uint8)
    thresh = cv2.erode(thresh, kernel, iterations=iter)
    thresh = cv2.dilate(thresh, kernel, iterations=iter)
    ctrs = cv2.findContours(
        thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    ctrs = imutils.grab_contours(ctrs)
    return image, ctrs, paper, gray, edged, thresh


