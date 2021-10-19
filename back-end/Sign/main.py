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
app.config['CORS_HEADERS'] = 'mp4'
app.config['UPLOAD_FOLDER'] = './image/'
myintvariable = 1
os.environ['DEBUSSY'] = str(myintvariable)

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


@app.route('/', methods=["GET"])
@cross_origin()
def main():
    return jsonify('Speech to Sign Language')


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_voice():
    os.chdir("/Users/MYPRO/Desktop/TARP-PROJECT/back-end/Sign")
    path = "/Users/MYPRO/Desktop/TARP-PROJECT/back-end/Sign"
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
                "/Users/MYPRO/Desktop/TARP-PROJECT/back-end/Sign/image/{}.jpg".format(j))
            img = cv2.imread(filename)
            img_array.append(img)
        filename = (
            "/Users/MYPRO/Desktop/TARP-PROJECT/back-end/Sign/image/space.jpg")
        img = cv2.imread(filename)
        img_array.append(img)
        height, width, layers = img.shape
    video = cv2.VideoWriter(
        "test.mp4", cv2.VideoWriter_fourcc(*'MJPG'), 1, (width, height))
    for image in img_array:
        video.write(image)
    cv2.destroyAllWindows()
    video.release()
    # env_var = os.environ
    # print("User's Environment variable:")
    # pprint.pprint(dict(env_var), width=1)
    pwd = os.environ.get('PWD')
    return jsonify("File sent sucessfully")


if __name__ == '__main__':
    app.run(host="192.168.0.105", port=3301, debug=True)
