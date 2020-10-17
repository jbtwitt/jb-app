import cv2
import json
import time
import numpy as np
from Yolo import Yolo, DiffYolo, DIFFDECODES
from emerald_chase_util import httpGetImg, getImgInfo, PiCamCacheRepo

class HomePiApp:
  def __init__(self):
    self.pis = json.load(open("../src/assets/pi-addr.json"))
    jbConf = json.load(open("jbconf.json"))
    modelPath = jbConf["models"]["yolov3"]
    self.yoloNet = Yolo(modelPath)

  def getPiImgs(self):
    imgs = []
    for pi in self.pis:
      try:
        img = httpGetImg(pi['url'])
        if pi['rotate']:
          img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
        imgs.append(img)
      except Exception as e:
        print(e)
    return imgs

  def runTakeaLook(self):
    for img in self.getPiImgs():
      objs = self.yoloNet.findDetectedObjects(img)
      print(objs)
      if objs is not None:
        self.yoloNet.drawDetectedObjects('PiImg', img, objs)

  def runCamMovement(self, piId=0, loop=3):
    pi = self.pis[piId]
    detect = DiffYolo(trainedImageSize=(608, 608))
    for i in range(loop):
      try:
        imgInfo = getImgInfo(pi)
        ret = detect.run(self.yoloNet, imgInfo)
        foundObjs = imgInfo['foundObjs']
        print(i, 'imgInfo foundObjs -> ', foundObjs)
        if ret is not None:
          print('*****', ret, DIFFDECODES[ret])
          self.yoloNet.drawDetectedObjects('Diff', imgInfo['img'], imgInfo['foundObjs'])
        time.sleep(.5)
      except Exception as e:
        print('runMovement', e)

  def runAllCamMovements(self):
    for i in range(len(self.pis)):
      print(self.pis[i])
      self.runCamMovement(i, loop=3)

  def runSearchCamCache(self, timePattern="14125*.jpg", piId=0, day=1, classIds=[0,2,5,7]):
    count = 0
    pi = self.pis[piId]
    piRepo = PiCamCacheRepo(pi)
    imgSrc = piRepo.getImgSrc(day, timePattern)
    while(True):
      imgInfo = piRepo.getImgInfoFromImgSrc(imgSrc)
      if (imgInfo is None):
        break
      objs = self.yoloNet.findDetectedObjects(imgInfo['img'])
      if objs is not None:
        print(count, imgInfo['timestamp'], 'imgInfo foundObjs -> ', objs)
        for classId, _, _ in objs:
          if classId in classIds:
            self.yoloNet.drawDetectedObjects(imgInfo['timestamp'], imgInfo['img'], objs)
            time.sleep(1)
            break
      count = count + 1
    print('Total', count, 'searched')

  def app_main(self, methodName='runCamMovement'):
    method = getattr(self, methodName)
    method()

import sys
if __name__ == '__main__':
  homePiApp = HomePiApp()
  if len(sys.argv) > 1:
    homePiApp.app_main(sys.argv[1])
  else:
    homePiApp.app_main()
