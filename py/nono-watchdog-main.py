import json
from time import time, sleep
from datetime import datetime, timedelta
import nonopath
from Yolo import Yolo
from nono_util import UrlSnapshot
from nonotarget import findNonoTarget, CHANNEL_WATCHES
from nonowatchdog import NonoWatchDog

jbConf = json.load(open("jbconf.json"))
url = jbConf["nono"]['url']
yoloNet = Yolo(jbConf["models"]["yolov3"], confidence=.2, threshold=.2)

def watch_main(urlSnapshot, channels=[0, 1, 2, 3]):
  for id in channels:
    name, channel, watchlist = CHANNEL_WATCHES[id]
    print('ch', channel, name, [yoloNet.classLabel(id) for id in watchlist])
    imgPath, timestamp, objs, matches = findNonoTarget(yoloNet, urlSnapshot, url, channel)
    if objs is not None and len(matches) > 0:
      img = nonopath.readNonoImg(imgPath, timestamp)
      yoloNet.drawDetectedObjects(imgPath, img, objs)

import sys
if __name__ == '__main__':
  if len(sys.argv) > 2:
    urlSnapshot = UrlSnapshot(sys.argv[1], sys.argv[2])
    if len(sys.argv) == 3:
      watchdog = NonoWatchDog(yoloNet, urlSnapshot, url)
      watchdog.schedule_watch_today(11, 55)
      sys.exit()
      watch_main(sys.argv[1], sys.argv[2])
    elif len(sys.argv) > 3:
      watch_main(urlSnapshot, channels=[int(val) for val in sys.argv[3:]])
