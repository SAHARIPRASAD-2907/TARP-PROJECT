import cv2;
def draw_contours(questionCtrs,boundingBoxes,paper):
    color = (0, 255, 0)
    i = 0
    for q in range(len(questionCtrs)):
        cv2.drawContours(paper, questionCtrs[q], -1, color, 3)
        cv2.putText(paper, str(i), (boundingBoxes[q][0] + boundingBoxes[q][2] // 2, boundingBoxes[q]
                    [1] + boundingBoxes[q][3] // 2), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
        i += 1
