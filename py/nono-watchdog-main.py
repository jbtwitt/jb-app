import json
import nonopath
from Yolo import Yolo
from nono_util import UrlSnapshot
from nonotarget import findNonoTarget, CHANNEL_WATCHES

jbConf = json.load(open("jbconf.json"))
modelPath = jbConf["models"]["yolov3"]
url = jbConf["nono"]['url']
yoloNet = Yolo(modelPath, confidence=.2, threshold=.2)

def watch_period(u, p, channel, period=10, step=1):
  pass

def watch_main(u, p, channels=[0, 1, 2, 3]):
  urlSnapshot = UrlSnapshot(u, p)
  for id in channels:
    name, channel, watchlist = CHANNEL_WATCHES[id]
    print('ch', channel, name, [yoloNet.classLabel(id) for id in watchlist])
    imgPath, timestamp, objs, matches = findNonoTarget(yoloNet, urlSnapshot, url, channel)
    if objs is not None and len(matches) > 0:
      img = nonopath.readNonoImg(imgPath, timestamp)
      yoloNet.drawDetectedObjects(imgPath, img, objs)

import sys
if __name__ == '__main__':
  if len(sys.argv) == 3:
    watch_main(sys.argv[1], sys.argv[2])
  elif len(sys.argv) > 3:
    watch_main(sys.argv[1], sys.argv[2], channels=[int(val) for val in sys.argv[3:]])
