import time
import json
from Yolo import Yolo, DiffYolo, DIFFDECODES
from nono_util import UrlSnapshot, getImgInfo
import yoloutil

ALL_CHANNELS = [
  (1, 'room'),
  (0, 'store'),
  (3, 'driveway out'),
  (2, 'driveway in')
]

class NonoApp:
  def __init__(self, u, p, confidence=.3, threshold=.2):
    jbConf = json.load(open("jbconf.json"))
    modelPath = jbConf["models"]["yolov3"]
    self.url = jbConf["nono"]['url']
    self.urlSnapshot = UrlSnapshot(u, p)
    self.yoloNet = Yolo(modelPath, confidence=confidence, threshold=threshold)

  def getCamImgs(self):
    imgInfos = []
    for ch in ALL_CHANNELS:
      try:
        imgInfos.append(getImgInfo(self.urlSnapshot, self.url, ch[0]))
      except Exception as e:
        print('getCamImgs', e)
    return imgInfos

  def runTakeaLook(self):
    for imgInfo in self.getCamImgs():
      objs = self.yoloNet.findDetectedObjects(imgInfo['img'])
      print(objs)
      if objs is not None:
        yoloutil.drawObjs('CamImg', imgInfo['img'], objs)

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
          yoloutil.drawObjs('Diff', imgInfo['img'], imgInfo['foundObjs'])
        time.sleep(.1)
      except Exception as e:
        print('ex', e)

  def runAllCamMovements(self):
    for ch in ALL_CHANNELS:
      print('channel', ch)
      self.runCamMovement(channel=ch[0], loop=3)

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
    if len(sys.argv) > 3:
      nonoApp.app_main(sys.argv[3])
    else:
      nonoApp.app_main()
