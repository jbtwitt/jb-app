import os
import time
from datetime import datetime
import imgfile
import pyobjectfile

NONO_REPO = "/jbdata/yolo_repo/nono/"
NONO_CHANNEL_IMGPATH = NONO_REPO + "{}/ch{}/"
NONO_IMG_FILE = "{}{}.jpg"  # img path & timestamp
NONO_WATCHDOG_PATH = NONO_REPO + 'watchdog/'
NONO_URL = "{}/cgi-bin/web_jpg.cgi?ch={}&{}"  # (url, channel, jsTimestamp)

def datePathFormat(timestamp):
  dt = datetime.fromtimestamp(timestamp).timetuple()
  # print(timestamp, dt)
  return "%d%02d%02d" % (dt.tm_year, dt.tm_mon, dt.tm_mday)

def camChannelPath(channel):
  timestamp = int(time.time())
  imgPath = NONO_CHANNEL_IMGPATH.format(datePathFormat(timestamp), channel)
  if not os.path.exists(imgPath):
    os.makedirs(imgPath)
  return imgPath, timestamp

def saveNonoImg(path, timestamp, imgdata):
  imgfile.saveImgData(NONO_IMG_FILE.format(path, timestamp), imgdata)

def readNonoImg(imgPath, timestamp):
  return imgfile.readImg(NONO_IMG_FILE.format(imgPath, timestamp))

"""
Watchdog
"""
def watchdogFileName():
  dt = datetime.now().timetuple()
  return "%d%02d%02d%02d%02d%02d.wdog" % (
    dt.tm_year, dt.tm_mon, dt.tm_mday, dt.tm_hour, dt.tm_min, dt.tm_sec
  )

def saveNonoWatchdog(pyobject):
  filename = NONO_WATCHDOG_PATH + watchdogFileName()
  pyobjectfile.writePyObject(filename, pyobject)
  return filename

if __name__ == '__main__':
  imgPath, timestamp = camChannelPath(channel=1)
  print(imgPath, timestamp)
