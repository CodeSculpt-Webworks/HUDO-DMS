from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'data'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/submit-form', methods=['POST'])
def submit_form():
    try:
        form_data = request.form.to_dict()

        folder_name = form_data.get('title', 'default_folder')
        folder_path = os.path.join(app.config['UPLOAD_FOLDER'], folder_name)
        os.makedirs(folder_path, exist_ok=True)

        json_file_path = os.path.join(folder_path, 'data.json')
        with open(json_file_path, 'w') as json_file:
            json.dump(form_data, json_file, indent=2)

        if 'attachmentFile' in request.files:
            attachment_file = request.files['attachmentFile']
            if attachment_file.filename != '':
                filename = secure_filename(attachment_file.filename)
                attachment_file_path = os.path.join(folder_path, filename)
                attachment_file.save(attachment_file_path)

        return jsonify({"message": "Form submitted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
