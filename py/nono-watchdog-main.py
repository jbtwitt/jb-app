import json
from time import time, sleep
from datetime import datetime, timedelta
import nonopath
from Yolo import Yolo
from nono_util import UrlSnapshot
from nonotarget import findNonoTarget, CHANNEL_WATCHES
from nonowatchdog import NonoWatchDog
import pyobjectfile

jbConf = json.load(open("jbconf.json"))
url = jbConf["nono"]['url']
yoloNet = Yolo(jbConf["models"]["yolov3"], confidence=.2, threshold=.2)

def watch_main_(urlSnapshot, channels=[0, 1, 2, 3]):
  for id in channels:
    name, channel, watchlist = CHANNEL_WATCHES[id]
    print('ch', channel, name, [yoloNet.classLabel(id) for id in watchlist])
    imgPath, timestamp, objs, matches = findNonoTarget(yoloNet, urlSnapshot, url, channel)
    if objs is not None and len(matches) > 0:
      img = nonopath.readNonoImg(imgPath, timestamp)
      yoloNet.drawDetectedObjects(imgPath, img, objs)

def watch_results(filename):
  results = pyobjectfile.loadPyObject(filename)
  if len(results) > 0:
    for result in results:
      channel, imgPath, timestamp, objs, matches = result
      print([yoloNet.classLabel(id) for id in matches])
      img = nonopath.readNonoImg(imgPath, timestamp)
      yoloNet.drawDetectedObjects(imgPath, img, objs)

def watch_main(watchdog, channels=[0, 1, 2, 3]):
  results = []
  for channel in channels:
    # result = watchdog.schedule_watch_today(hour=11, min=55)
    results = results + watchdog.watch_period(channel)
  filename = '/tmp/d.pydata'
  pyobjectfile.writePyObject(filename, results)
  watch_results(filename)

import sys
if __name__ == '__main__':
  # filename = '/tmp/d.pydata'
  # results = pyobjectfile.loadPyObject(filename)
  # print(results)
  # sys.exit()
  if len(sys.argv) > 2:
    urlSnapshot = UrlSnapshot(sys.argv[1], sys.argv[2])
    if len(sys.argv) == 3:
      watchdog = NonoWatchDog(yoloNet, urlSnapshot, url)
      # result = watchdog.schedule_watch_today(hour=11, min=55)
      # sys.exit()
      watch_main(watchdog)
    elif len(sys.argv) > 3:
      watch_main(urlSnapshot, channels=[int(val) for val in sys.argv[3:]])
