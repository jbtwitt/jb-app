from time import time, sleep
from datetime import datetime, timedelta
import nonotarget

class NonoWatchDog:
  def __init__(self, yoloNet, urlSnapshot, url, channels=[0,1,2,3]):
    self.yoloNet = yoloNet
    self.urlSnapshot = urlSnapshot
    self.url = url
    self.channels = channels

  def schedule_watch(self, scheduledDatetime, period=5, step=1):
    print('now', datetime.now())
    print('scheduled', scheduledDatetime)
    seconds = int((scheduledDatetime - datetime.now()).total_seconds())
    if seconds > 0:
      print("watch after", seconds, 'seconds')
      sleep(seconds)
      startTime = datetime.now()
      return startTime, self.watch_period(period)
    return None, None

  def schedule_watch_today(self, hour, minute, period=5, step=1):
    cur = datetime.now()
    scheduled = datetime(cur.year, cur.month, cur.day, hour, minute)
    return self.schedule_watch(scheduled, period, step)

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
    return results
