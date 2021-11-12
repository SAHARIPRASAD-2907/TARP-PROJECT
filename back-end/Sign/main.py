from flask import Flask, jsonify, flash, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename, send_file, send_from_directory
import pprint
import os
import shutil
from flask_cors import CORS, cross_origin
from nltk import PorterStemmer, word_tokenize
import cv2
import numpy as np
import os
import cv2
from PIL import Image

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


@app.route('/', methods=["GET"])
@cross_origin()
def main():
    return jsonify('Speech to Sign Language')


@app.route('/upload2', methods=['POST'])
@cross_origin()
def upload_voice():
    os.chdir(
        "/Users/sahariprasad/Desktop/CODING/SEMISTER-6/TARP-PROJECT/back-end/Sign")
    path = "/Users/sahariprasad/Desktop/CODING/SEMISTER-6/TARP-PROJECT/back-end/Sign"
    mean_height = 0
    mean_width = 0
    num_of_images = len(os.listdir('.'))
    for file in os.listdir('.'):
        if file.endswith(".jpg") or file.endswith(".jpeg") or file.endswith("png"):
            im = Image.open(os.path.join(path, file))
            width, height = im.size
            mean_width += width
            mean_height += height
    mean_width = int(mean_width / num_of_images)
    mean_height = int(mean_height / num_of_images)
    for file in os.listdir('.'):
        if file.endswith(".jpg") or file.endswith(".jpeg") or file.endswith("png"):
            im = Image.open(os.path.join(path, file))
            width, height = im.size
            print(width, height)
            imResize = im.resize((mean_width, mean_height), Image.ANTIALIAS)
            imResize.save(file, 'JPEG', quality=95)
            print(im.filename.split('\\')[-1], " is resized")
    ps = PorterStemmer()
    text = request.form["speech"]
    text = word_tokenize(text)
    img_array = []
    for i, j in enumerate(text):
        text[i] = ps.stem(j).lower()
    for i in text:
        for j in i:
            filename = (
                "/Users/sahariprasad/Desktop/CODING/SEMISTER-6/TARP-PROJECT/back-end/Sign/image/{}.jpg".format(j))
            img = cv2.imread(filename)
            img_array.append(img)
        filename = (
            "/Users/sahariprasad/Desktop/CODING/SEMISTER-6/TARP-PROJECT/back-end/Sign/image/space.jpg")
        img = cv2.imread(filename)
        img_array.append(img)
        height, width, layers = img.shape
    os.chdir("/Users/sahariprasad/Desktop/CODING/SEMISTER-6/TARP-PROJECT/deaf-people/src/pages/sign-language-converter")
    video = cv2.VideoWriter(
        "test.webm", cv2.VideoWriter_fourcc(*'vp80'), 1, (width, height))
    for image in img_array:
        video.write(image)
    cv2.destroyAllWindows()
    video.release()
    return jsonify("File sent sucessfully")


if __name__ == '__main__':
    app.run(port=5001, debug=True)
