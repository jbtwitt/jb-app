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

import pyobjectfile
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
  startTime, results, endTime = watchdog.watch_period(period=period)
  if len(results) > 0:
    filename = nonopath.saveNonoWatchdog((startTime, endTime, results))
    watch_results(filename)

# def schedule_watch_main(watchdog, hour, minute, period=15):
def schedule_watch_main(watchdog, scheduledMeta):
  hour, minute, period, step = (None, None, 15, 1)
  if len(scheduledMeta) == 2:
    hour, minute = scheduledMeta
  if len(scheduledMeta) == 3:
    hour, minute, period = scheduledMeta
  if len(scheduledMeta) == 4:
    hour, minute, period, step = scheduledMeta
  startTime, results, endTime = watchdog.schedule_watch_today(hour, minute, period, step)
  if len(results) > 0:
    filename = nonopath.saveNonoWatchdog((startTime, endTime, results))
    watch_results(filename)

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
      schedule_watch_main(watchdog, [int(arg) for arg in sys.argv[3:]])
