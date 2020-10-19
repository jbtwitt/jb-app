from time import time, sleep
from datetime import datetime, timedelta
import nonotarget
import nonopath
import yoloutil

import pyobjectfile
def show_wdogfile(yoloNet, wdogFile):
  startTime, endTime, results = pyobjectfile.loadPyObject(wdogFile)
  print(startTime)
  print(endTime)
  if len(results) > 0:
    for result in results:
      channel, imgPath, timestamp, objs, matches = result
      print("channel", channel, [yoloutil.labelName(id) for id in matches])
      img = nonopath.readNonoImg(imgPath, timestamp)
      yoloutil.drawObjs(imgPath, img, objs)

class NonoWatchDog:
  def __init__(self, yoloNet, urlSnapshot, url, channels=[0,1,2,3]):
    self.yoloNet = yoloNet
    self.urlSnapshot = urlSnapshot
    self.url = url
    self.channels = channels

  def schedule_future_watch(self, scheduledDatetime, period=5, step=1):
    print('now', datetime.now())
    print('scheduled', scheduledDatetime)
    seconds = int((scheduledDatetime - datetime.now()).total_seconds())
    if seconds > 0:
      print("watch after", seconds, 'seconds')
      sleep(seconds)
      return self.watch_period(period)
    return None, None, None

  def schedule_watch_today(self, hour, minute, period=5, step=1):
    cur = datetime.now()
    scheduled = datetime(cur.year, cur.month, cur.day, hour, minute)
    return self.schedule_future_watch(scheduled, period, step)

  def watch_period(self, period=5, step=1):
    results = []
    start = datetime.now()
    while(start > (datetime.now() - timedelta(seconds=period))):
      for channel in self.channels:
        imgPath, timestamp, objs, matches = nonotarget.findNonoTarget(
          self.yoloNet, self.urlSnapshot, self.url, channel
        )
        if objs is not None and len(matches) > 0:
          results.append((channel, imgPath, timestamp, objs, matches))
      sleep(step)
    return start, results, datetime.now()
