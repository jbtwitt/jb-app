CONT_REPO_PATH = r"\\{}\camCache$/{}/"

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

# def saveImgInfo(piId, imgInfo):
#   path = CONT_PATH.format(piId, imgInfo['timestamp'])
#   jpgFile = open(path, "wb")
#   jpgFile.write(imgInfo['img'])
#   jpgFile.close()

import os
import glob
class PiCamCacheRepo:
  def __init__(self, piIp, day=0, pattern="09*.jpg"):
    self.repo = CONT_REPO_PATH.format(piIp, day)
    self.jpgs = glob.glob(self.repo + pattern)

  def getImgInfo(self, rotate=False):
    try:
      f = self.jpgs.pop()
      ts, _ = os.path.splitext(os.path.basename(f))
      file = open(f, "rb")
      nparr = np.frombuffer(file.read(), np.uint8)
      file.close()
      img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
      if rotate:
        img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
      return {
        'timestamp': ts,
        'img': img
      }
    except Exception as e:
      print('PiCamCacheRepo', e)

if __name__ == "__main__":
  piRepo = PiCamCacheRepo('192.168.0.115')
  imgInfo = piRepo.getImgInfo(rotate=True)
  cv2.imshow(imgInfo['timestamp'], imgInfo['img'])
  cv2.waitKey(0)
