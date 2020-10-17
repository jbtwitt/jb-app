import cv2
import numpy as np

def saveImgData(filename, imgdata):
  with open(filename, "wb") as f:
    f.write(imgdata)

def readImgData(filename):
  # f = open(filename, "rb")
  # imgdata = f.read()
  # f.close()
  with open(filename, "rb") as f:
    return f.read()

def readImg(filename):
  return cv2.imread(filename)
  # imgdata = readImgData(filename)
  # nparr = np.frombuffer(imgdata, np.uint8)
  # return cv2.imdecode(nparr, cv2.IMREAD_COLOR)
