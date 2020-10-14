import time, datetime

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

def testRun(jbConf, u, p):
  imgs = []
  url = jbConf["nono"]['url']
  urlSnapshot = UrlSnapshot(u, p)
  timestamp = int(time.time() * 1000) # = new Date().getTime()
  channels = [0, 1, 2, 3]
  for channel in channels:
    imgUrl = "{}/cgi-bin/web_jpg.cgi?ch={}&{}".format(url, channel, timestamp)
    print(imgUrl)
    try:
      img = urlSnapshot.httpGetImg(imgUrl)
      print(img.shape)
      imgs.append(img)
    except Exception as e:
      print(e)
  modelPath = jbConf["models"]["yolov3"]
  runModel(modelPath, imgs)

def testTrace(jbConf, u, p, channel=1):
  imgs = []
  url = jbConf["nono"]['url']
  urlSnapshot = UrlSnapshot(u, p)
  for i in range(2):
    timestamp = int(time.time() * 1000)
    imgUrl = "{}/cgi-bin/web_jpg.cgi?ch={}&{}".format(url, channel, timestamp)
    try:
      img = urlSnapshot.httpGetImg(imgUrl)
      imgs.append(img)
      print(img.shape)
      time.sleep(.1)
    except Exception as e:
      print(e)
  modelPath = jbConf["models"]["yolov3"]
  runModel(modelPath, imgs)


def testTimestamp(timestampInMilliSeconds):
  # timestamp in milli seconds
  # jsTimestamp = int(time.time() * 1000)
  return datetime.datetime.fromtimestamp(timestampInMilliSeconds / 1000)

def compare(x, y):
  shared_items = {k: x[k] for k in x if k in y and x[k] == y[k]}
  print(len(shared_items))



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

import sys
import json
if __name__ == '__main__':
  # print(testTimestamp(time.time() * 1000))
  # sys.exit()
  if len(sys.argv) > 2:
    jbConf = json.load(open("jbconf.json"))
    # testRun(jbConf, sys.argv[1], sys.argv[2])
    # testTrace(jbConf, sys.argv[1], sys.argv[2], channel=2)
    for ch in [1]:
      runMovement(jbConf, sys.argv[1], sys.argv[2], channel=ch, loop=10)
