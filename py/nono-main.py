import time

from Yolo import Yolo
from nono_util import UrlSnapshot, getImgInfo
def runModel(modelPath, imgs):
  yoloNet = Yolo(modelPath, .3, .2)
  for img in imgs:
    objs = yoloNet.findDetectedObjects(img, (320, 320))
    # objs = yoloNet.findDetectedObjects(img, TrainedImageSize=(416, 416))
    print(objs)
    if objs is not None:
      yoloNet.drawDetectedObjects("title", img, objs)

from Yolo import DiffYolo, DIFFDECODES
def runMovement(jbConf, u, p, channel=1, loop=3):
  print('channel', channel)
  modelPath = jbConf["models"]["yolov3"]
  yoloNet = Yolo(modelPath, confidence=.3, threshold=.2)
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

from nono_util import getImgInfosFromRepo
def runMovementFromRepo(jbConf, channel=1):
  print('channel', channel)
  modelPath = jbConf["models"]["yolov3"]
  yoloNet = Yolo(modelPath, confidence=.3, threshold=.2)
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
def store(jbConf, u, p, channel=1, loop=5, sleepSeconds=.5):
  url = jbConf["nono"]['url']
  urlSnapshot = UrlSnapshot(u, p)
  getSaveImgInfo(urlSnapshot, url)

import sys
import json
if __name__ == '__main__':
  if len(sys.argv) > 2:
    jbConf = json.load(open("jbconf.json"))
    # store(jbConf, sys.argv[1], sys.argv[2])
    # runMovementFromRepo(jbConf, 1)
    # sys.exit()
    for ch in [1, 3, 0, 2]:
      runMovement(jbConf, sys.argv[1], sys.argv[2], channel=ch, loop=3)
