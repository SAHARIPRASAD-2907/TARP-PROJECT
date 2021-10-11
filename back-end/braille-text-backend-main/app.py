from flask import Flask, jsonify, flash, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename
import os
import shutil
from flask_cors import CORS, cross_origin
# Processing modules
from modulesTARP import get_image as gi
from modulesTARP import get_diameter as gd
from modulesTARP import get_circles as gc
from modulesTARP import sort_contours as sc
from modulesTARP import draw_contours as dc
from modulesTARP import get_spacing as gs
from modulesTARP import get_letters as gl
from modulesTARP import transalate as tl

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=["GET"])
@cross_origin()
def main():
    return jsonify('Image to braille')


@app.route('/upload', methods=['GET', 'POST'])
@cross_origin()
def upload_image():
    print(request.files)
    if 'file' not in request.files:
        return jsonify("No file upload")
    file = request.files['file']
    if file and allowed_file(file.filename):
        path = './uploads'
        os.mkdir(path)
        filename = secure_filename(file.filename)
        UPLOAD_FOLDER = path
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        url = './'+path+'/'+filename
        image, ctrs, paper, gray, edged, thresh = gi.get_image(
            url, iter=0, width=1500)
        diam = gd.get_diameter(ctrs)
        dotCtrs = gc.get_circles(diam, ctrs)
        questionCtrs, boundingBoxes, xs, ys = sc.sort_contours(
            dotCtrs, diam, image)
        dc.draw_contours(questionCtrs, boundingBoxes, paper)
        linesV, d1, d2, d3, spacingX, spacingY = gs.get_spacing(
            diam, boundingBoxes, xs)
        letters = gl.get_letters(
            boundingBoxes, spacingY, diam, linesV, showID=False,)
        ans = tl.translate(letters)
        shutil.rmtree('./uploads')
        print(ans)
        return jsonify(ans)
    else:
        return jsonify('Allowed image types are - png, jpg, jpeg, gif')


if __name__ == '__main__':
    app.run(debug=True)
