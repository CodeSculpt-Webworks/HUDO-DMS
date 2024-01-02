from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import os
import time

gauth = GoogleAuth()
gauth.LocalWebserverAuth()
drive = GoogleDrive(gauth)

local_folder_path = './data'
drive_folder_id = '1yznCO3-h5pT_joDma2GpCW6X14KWbZ6n'

uploaded_files = {}


def upload_to_drive(file_path, parent_folder_id=None):
    file_name = os.path.basename(file_path)

    if os.path.isdir(file_path):
        # Upload folder
        folder_drive = drive.CreateFile(
            {'title': file_name, 'mimeType': 'application/vnd.google-apps.folder', 'parents': [{'id': parent_folder_id}]})
        folder_drive.Upload()
        print(f"Uploaded folder '{file_name}' to Google Drive.")

        # Upload files within the folder
        for item in os.listdir(file_path):
            item_path = os.path.join(file_path, item)
            upload_to_drive(item_path, folder_drive['id'])
    elif os.path.isfile(file_path):
        # Upload file
        file_drive = drive.CreateFile(
            {'title': file_name, 'parents': [{'id': parent_folder_id}]})
        file_drive.Upload()
        print(f"Uploaded file '{file_name}' to Google Drive.")


while True:
    local_files = os.listdir(local_folder_path)

    for file_name in local_files:
        file_path = os.path.join(local_folder_path, file_name)
        if file_name not in uploaded_files:
            upload_to_drive(file_path, drive_folder_id)
            uploaded_files[file_name] = True

    time.sleep(10)
