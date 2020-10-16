import cv2
import numpy as np

def saveImgData(filename, imgdata):
  f = open(filename, "wb")
  f.write(imgdata)
  f.close()

def readImgData(filename):
  f = open(filename, "rb")
  imgdata = f.read()
  f.close()
  return imgdata

def readImg(filename):
  imgdata = readImgData(filename)
  nparr = np.frombuffer(imgdata, np.uint8)
  return cv2.imdecode(nparr, cv2.IMREAD_COLOR)
