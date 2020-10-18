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

def watch_results(filename):
  startTime, endTime, results = pyobjectfile.loadPyObject(filename)
  print(startTime)
  print(endTime)
  if len(results) > 0:
    for result in results:
      channel, imgPath, timestamp, objs, matches = result
      print("channel", channel, [yoloNet.classLabel(id) for id in matches])
      img = nonopath.readNonoImg(imgPath, timestamp)
      yoloNet.drawDetectedObjects(imgPath, img, objs)

def watch_main(watchdog, period=15):
  startTime = datetime.now()
  results = watchdog.watch_period(period=period)
  endTime = datetime.now()
  filename = '/tmp/d.pydata'
  pyobjectfile.writePyObject(filename, (startTime, endTime, results))
  # watch_results(filename)

def schedule_watch_main(watchdog, hour, minute, period=15):
  startTime, results = watchdog.schedule_watch_today(hour, minute, period)
  endTime = datetime.now()
  filename = '/tmp/d.pydata'
  pyobjectfile.writePyObject(filename, (startTime, endTime, results))

import sys
if __name__ == '__main__':
  # filename = '/tmp/d.pydata'
  # watch_results(filename)
  # results = pyobjectfile.loadPyObject(filename)
  # print(results)
  # sys.exit()
  if len(sys.argv) > 2:
    urlSnapshot = UrlSnapshot(sys.argv[1], sys.argv[2])
    watchdog = NonoWatchDog(yoloNet, urlSnapshot, url)
    if len(sys.argv) == 3:
      # result = watchdog.schedule_watch_today(hour=11, min=55)
      # sys.exit()
      watch_main(watchdog)
    elif len(sys.argv) > 4:
      schedule_watch_main(watchdog, int(sys.argv[3]), int(sys.argv[4]))
    elif len(sys.argv) > 5:
      schedule_watch_main(watchdog, int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]))
