from time import time, sleep
from datetime import datetime, timedelta
import nonotarget

class NonoWatchDog:
  def __init__(self, yoloNet, urlSnapshot, url):
    self.yoloNet = yoloNet
    self.urlSnapshot = urlSnapshot
    self.url = url

  def schedule_watch(self, scheduledDatetime, channel=1, period=5):
    print('now', datetime.now())
    print('scheduled', scheduledDatetime)
    seconds = int((scheduledDatetime - datetime.now()).total_seconds())
    if seconds > 0:
      print("watch after", seconds, 'seconds')
      sleep(seconds)
      self.watch_period(channel, period)

  def schedule_watch_today(self, hour, min, channel=1, period=5):
    cur = datetime.now()
    scheduled = datetime(cur.year, cur.month, cur.day, hour, min)
    self.schedule_watch(scheduled, channel, period)

  def watch_period(self, channel=1, period=5, step=1):
    result = []
    start = datetime.now()
    while(start > (datetime.now() - timedelta(seconds=period))):
      imgPath, timestamp, objs, matches = nonotarget.findNonoTarget(
        self.yoloNet, self.urlSnapshot, self.url, channel
      )
      if objs is not None and len(matches) > 0:
        result.append((channel, imgPath, timestamp, matches))
      sleep(step)
    return result
