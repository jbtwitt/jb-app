import time

from Yolo import Yolo, DiffYolo, DIFFDECODES
from nono_util import UrlSnapshot, getImgInfo, getImgInfosFromRepo

def runMovement(yoloNet, u, p, channel=1, loop=3):
  print('channel', channel)
  detect = DiffYolo()
  url = jbConf["nono"]['url']
  urlSnapshot = UrlSnapshot(u, p)
  for i in range(loop):
    try:
      imgInfo = getImgInfo(urlSnapshot, url, channel)
      ret = detect.run(yoloNet, imgInfo)
      foundObjs = imgInfo['foundObjs']
      print(i, 'imgInfo foundObjs -> ', foundObjs)
      if ret is not None:
        print('*****', ret, DIFFDECODES[ret])
        yoloNet.drawDetectedObjects('Diff', imgInfo['img'], imgInfo['foundObjs'])
      time.sleep(.1)
    except Exception as e:
      print('ex', e)

def runMovementFromRepo(yoloNet, channel=1):
  print('channel', channel)
  detect = DiffYolo()
  imgInfos = getImgInfosFromRepo(channel)
  for imgInfo in imgInfos:
    try:
      ret = detect.run(yoloNet, imgInfo)
      foundObjs = imgInfo['foundObjs']
      print('imgInfo foundObjs -> ', foundObjs)
      if ret is not None:
        print('*****', ret, DIFFDECODES[ret])
        yoloNet.drawDetectedObjects('Diff', imgInfo['img'], imgInfo['foundObjs'])
      time.sleep(.1)
    except Exception as e:
      print('ex', e)

from nono_util import saveImgInfo, getSaveImgInfo
def runCamCache(url, u, p, channel=1, loop=5, sleepSeconds=.5):
  urlSnapshot = UrlSnapshot(u, p)
  getSaveImgInfo(urlSnapshot, url, channel=channel)

import sys
import json
if __name__ == '__main__':
  if len(sys.argv) > 2:
    jbConf = json.load(open("jbconf.json"))
    modelPath = jbConf["models"]["yolov3"]
    yoloNet = Yolo(modelPath, confidence=.3, threshold=.2)
    runCamCache(jbConf["nono"]['url'], sys.argv[1], sys.argv[2], channel=1)
    # runMovementFromRepo(yoloNet, 1)
    # sys.exit()
    for ch in [1, 3, 0, 2]:
      runMovement(yoloNet, sys.argv[1], sys.argv[2], channel=ch, loop=3)
