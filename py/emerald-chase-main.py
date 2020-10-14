import cv2
import json
import numpy as np

from emerald_chase_util import httpGetImg, getImgInfo
def loadImgs():
  imgs = []
  pis = json.load(open("../src/assets/pi-addr.json"))
  for pi in pis:
    print(pi)
    try:
      img = httpGetImg(pi['url'])
      if pi['rotate']:
        img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
      imgs.append(img)
    except Exception as e:
      print(e)
  return imgs

from Yolo import Yolo
def run(modelPath, imgs):
  yoloNet = Yolo(modelPath)
  for img in imgs:
    objs = yoloNet.findDetectedObjects(img)
    print(objs)
    if objs is not None:
      yoloNet.drawDetectedObjects("title", img, objs)


import time
from Yolo import DiffYolo, DIFFDECODES
def runMovement(modelPath, pi, loop=3):
  print(pi)
  yoloNet = Yolo(modelPath)
  detect = DiffYolo(trainedImageSize=(608, 608))
  for i in range(loop):
    try:
      imgInfo = getImgInfo(pi)
      ret = detect.run(yoloNet, imgInfo)
      foundObjs = imgInfo['foundObjs']
      print(i, 'imgInfo foundObjs -> ', foundObjs)
      if ret is not None:
        print('*****', ret, DIFFDECODES[ret])
        yoloNet.drawDetectedObjects('Diff', imgInfo['img'], imgInfo['foundObjs'])
      time.sleep(.5)
    except Exception as e:
      print('runMovement', e)

from emerald_chase_util import PiCamCacheRepo
def runSearch(modelPath, piIp, day, pattern, rotate=False, classId=0):
  count = 0
  yoloNet = Yolo(modelPath)
  piRepo = PiCamCacheRepo(piIp, day=0, pattern=pattern)
  while(True):
    imgInfo = piRepo.getImgInfo(rotate=True)
    if (imgInfo is None):
      break
    objs = yoloNet.findDetectedObjects(imgInfo['img'])
    if objs is not None:
      print(imgInfo['timestamp'], 'imgInfo foundObjs -> ', objs)
      for obj in objs:
        if obj['classId'] == classId:
          yoloNet.drawDetectedObjects(imgInfo['timestamp'], imgInfo['img'], objs)
          # cv2.imshow(imgInfo['timestamp'], imgInfo['img'])
          # cv2.waitKey(0)
    count = count + 1
  print('Total', count, 'searched')

import sys
if __name__ == '__main__':
  jbConf = json.load(open("jbconf.json"))
  modelPath = jbConf["models"]["yolov3"]
  # print(jbConf)
  # run(modelPath, loadImgs())
  runSearch(modelPath, '192.168.0.110', day=0, pattern='1800*.jpg', rotate=False, classId=0)
  # runSearch(modelPath, '192.168.0.115', day=0, pattern='1600*.jpg', rotate=True, classId=0)
  sys.exit()
  pis = json.load(open("../src/assets/pi-addr.json"))
  runMovement(modelPath, pis[1], loop=10)
  # runMovement(modelPath, pis[0])
