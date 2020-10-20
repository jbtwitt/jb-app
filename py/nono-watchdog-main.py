import json
from time import time, sleep
from datetime import datetime, timedelta
import nonopath
from Yolo import Yolo
from nono_util import UrlSnapshot
import nonowatchdog

jbConf = json.load(open("jbconf.json"))
url = jbConf["nono"]['url']
yoloNet = Yolo(jbConf["models"]["yolov3"], confidence=.2, threshold=.2)

def watch_main(watchdog, period=15):
  startTime, results, endTime = watchdog.watch_period(period=period)
  if len(results) > 0:
    filename = nonopath.saveNonoWatchdog((startTime, endTime, results))
    print(filename)

def schedule_watch_main(watchdog, scheduled, period, step):
  startTime, results, endTime = watchdog.schedule_future_watch(scheduled, period, step)
  if results is not None and len(results) > 0:
    filename = nonopath.saveNonoWatchdog((startTime, endTime, results))
    print(filename)

def watchdog_main(watchdog, args):
  if len(args) == 0:
    watch_main(watchdog)
  else:
    today = datetime.now()
    year, month, day = (today.year, today.month, today.day)
    hour, minute, period, step = (0, 0, 15, 1)
    for arg in args:
      t, value = arg[0], int(arg[1:])
      if t == 'h':
        hour = value
      elif t == 'm':
        minute = value
      elif t == 'p':
        period = value
      elif t == 's':
        step = value
      elif t == 'd':
        day = value
      elif t == 'M':
        month = value
      elif t == 'y':
        year = value
    scheduled = datetime(year, month, day, hour, minute)
    schedule_watch_main(watchdog, scheduled, period, step)

if __name__ == '__main__':
  import sys
  if len(sys.argv) > 2:
    urlSnapshot = UrlSnapshot(sys.argv[1], sys.argv[2])
    watchdog = nonowatchdog.NonoWatchDog(yoloNet, urlSnapshot, url)
    watchdog_main(watchdog, sys.argv[3:])
  elif len(sys.argv) > 1:
    nonowatchdog.show_wdogfile(yoloNet, sys.argv[1])
