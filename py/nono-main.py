import time
import json
from Yolo import Yolo, DiffYolo, DIFFDECODES
from nono_util import UrlSnapshot, getImgInfo, getImgInfosFromRepo
from nono_util import saveImgInfo, getSaveImgInfo

class NonoApp:
  def __init__(self, u, p, confidence=.3, threshold=.2):
    jbConf = json.load(open("jbconf.json"))
    modelPath = jbConf["models"]["yolov3"]
    self.url = jbConf["nono"]['url']
    self.yoloNet = Yolo(modelPath, confidence=confidence, threshold=threshold)
    self.urlSnapshot = UrlSnapshot(u, p)
    self.allChannels = [1, 3, 0, 2]
    self.channelNames = ['living-room', 'room', 'driveway in', 'driveway out']

  def getCamImgs(self):
    imgInfos = []
    for ch in self.allChannels:
      try:
        imgInfos.append(getImgInfo(self.urlSnapshot, self.url, ch))
      except Exception as e:
        print('getCamImgs', e)
    return imgInfos

  def runTakeaLook(self):
    for imgInfo in self.getCamImgs():
      objs = self.yoloNet.findDetectedObjects(imgInfo['img'])
      print(objs)
      if objs is not None:
        self.yoloNet.drawDetectedObjects('CamImg', imgInfo['img'], objs)

  def runCamMovement(self, channel=1, loop=3):
    detect = DiffYolo()
    for i in range(loop):
      try:
        imgInfo = getImgInfo(self.urlSnapshot, self.url, channel)
        ret = detect.run(self.yoloNet, imgInfo)
        foundObjs = imgInfo['foundObjs']
        print(i, 'imgInfo foundObjs -> ', foundObjs)
        if ret is not None:
          print('*****', ret, DIFFDECODES[ret])
          self.yoloNet.drawDetectedObjects('Diff', imgInfo['img'], imgInfo['foundObjs'])
        time.sleep(.1)
      except Exception as e:
        print('ex', e)

  def runAllCamMovements(self):
    for ch in self.allChannels:
      print('channel', ch, self.channelNames[ch])
      self.runCamMovement(channel=ch, loop=3)

  def runCacheCam(self, channel=1, loop=5, sleepSeconds=.5):
    getSaveImgInfo(self.urlSnapshot, self.url, channel=channel)

  def runMovementFromRepo(self, channel=1):
    detect = DiffYolo()
    imgInfos = getImgInfosFromRepo(channel)
    for imgInfo in imgInfos:
      try:
        ret = detect.run(self.yoloNet, imgInfo)
        foundObjs = imgInfo['foundObjs']
        print('imgInfo foundObjs -> ', foundObjs)
        if ret is not None:
          print('*****', ret, DIFFDECODES[ret])
          self.yoloNet.drawDetectedObjects('Diff', imgInfo['img'], imgInfo['foundObjs'])
        # time.sleep(.1)
      except Exception as e:
        print('runMovementFromRepo', e)

  def app_main(self, methodName='runCamMovement'):
    method = getattr(self, methodName)
    method()

def app_main(runMethod):
  runMethod()

import sys
if __name__ == '__main__':
  if len(sys.argv) > 2:
    nonoApp = NonoApp(sys.argv[1], sys.argv[2])
    # app_main(nonoApp.runAllCamMovements)
    # app_main(nonoApp.runCacheCam)
    # app_main(nonoApp.runMovementFromRepo)
    if len(sys.argv) > 3:
      nonoApp.app_main(sys.argv[3])
    else:
      nonoApp.app_main()
