CONT_PATH = "/jbdata/yolo_repo/emerald_chase/pi{}/{}.jpg"

import numpy as np
from urllib.request import urlopen
import cv2

def httpGetImg(imgUrl):
  try:
    response = urlopen(imgUrl)
    # print(response.info())
    data = response.read()
    if len(data) == 0:
      raise ValueError('httpGetImg: 0 length image')
    nparr = np.frombuffer(data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img
  except Exception as e:
    raise e

import time
def getImgInfo(pi):
  try:
    img = httpGetImg(pi['url'])
    if pi['rotate']:
      img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
    return {
      'timestamp': time.time(),
      'img': img
    }
  except Exception as e:
    raise e

def saveImgInfo(piId, imgInfo):
  # getImgInfo(urlSnapshot, url, channel)
  path = CONT_PATH.format(piId, imgInfo['timestamp'])
  jpgFile = open(path, "wb")
  jpgFile.write(imgInfo['img'])
  jpgFile.close()
