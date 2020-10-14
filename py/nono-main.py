import time
import json
from Yolo import Yolo, DiffYolo, DIFFDECODES
from nono_util import UrlSnapshot, getImgInfo, getImgInfosFromRepo
from nono_util import saveImgInfo, getSaveImgInfo

class NonoApp:
  def __init__(self, u, p):
    self.u = u
    self.p = p
    jbConf = json.load(open("jbconf.json"))
    modelPath = jbConf["models"]["yolov3"]
    self.url = jbConf["nono"]['url']
    self.yoloNet = Yolo(modelPath, confidence=.3, threshold=.2)

  def runCamMovement(self, channel=1, loop=3):
    detect = DiffYolo()
    urlSnapshot = UrlSnapshot(self.u, self.p)
    for i in range(loop):
      try:
        imgInfo = getImgInfo(urlSnapshot, self.url, channel)
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
    for ch in [1, 3, 0, 2]:
      print('channel', ch)
      self.runCamMovement(channel=ch, loop=3)

  def runCacheCam(self, channel=1, loop=5, sleepSeconds=.5):
    urlSnapshot = UrlSnapshot(self.u, self.p)
    getSaveImgInfo(urlSnapshot, self.url, channel=channel)

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
