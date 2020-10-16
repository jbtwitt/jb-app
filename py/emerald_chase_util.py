CONT_REPO_PATH = "\\\\{}\camCache$/{}/"
CONT_STAGE_PATH = "/jbdata/yolo_repo/emerald_chase/pi{}/{}/"

import shutil
import datetime
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
  def __init__(self, pi):
    self.pi = pi

  def getCamCacheDate(self, day):
    return datetime.datetime.fromtimestamp(
      os.path.getmtime(CONT_REPO_PATH.format(self.pi['ip'], day))
    )

  def getImgSrc(self, day, timePattern):
    repo = CONT_REPO_PATH.format(self.pi['ip'], day)
    return glob.glob(repo + timePattern)

  def getImgInfoFromImgSrc(self, imgSrc):
    try:
      f = imgSrc.pop()
      ts, _ = os.path.splitext(os.path.basename(f))
      file = open(f, "rb")
      nparr = np.frombuffer(file.read(), np.uint8)
      file.close()
      img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
      if self.pi['rotate']:
        img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
      return {
        'timestamp': ts,
        'img': img
      }
    except Exception as e:
      print('PiCamCacheRepo', e)

  def copyToStageFolder(self, day, timePattern):
    jpgFiles = []
    jpgSrcRepo = glob.glob(CONT_REPO_PATH.format(self.pi['ip'], day) + timePattern)
    stageFolder = CONT_STAGE_PATH.format(self.pi['id'], day)
    while(True):
      try:
        f = jpgSrcRepo.pop()
        shutil.copy(f, stageFolder)
        jpgFiles.append(os.path.basename(f) + '.jpg')
      except Exception as e:
        print(e)
        break
    return {
      'stageFolder': stageFolder,
      'jpgFiles': jpgFiles
    }

##### test functions
def testGetImgInfo(pi, day):
  piRepo = PiCamCacheRepo(pi)
  imgSrc = piRepo.getImgSrc(day, "1611*")
  imgInfo = piRepo.getImgInfoFromImgSrc(imgSrc)
  cv2.imshow(imgInfo['timestamp'], imgInfo['img'])
  cv2.waitKey(0)

def testCopyToStageFolder(pis):
  day = 0
  pi = pis[0]
  print(pi, 'day=', day)
  piRepo = PiCamCacheRepo(pi)
  print('camCache day', day, 'date', piRepo.getCamCacheDate(day))
  jpgFiles = piRepo.copyToStageFolder(day=day, timePattern="1611*")
  print('copy jpg ', len(jpgFiles['jpgFiles']))

import json
if __name__ == "__main__":
  pis = json.load(open("../src/assets/pi-addr.json"))
  # testCopyToStageFolder(pis)
  testGetImgInfo(pis[0], day=0)
