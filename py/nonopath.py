import os
import time
from datetime import datetime

NONO_CHANNEL_IMGPATH = "/jbdata/yolo_repo/nono/{}/ch{}/"
NONO_IMG_FILE = "{}{}.jpg"  # img path & timestamp
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

import imgfile
def saveNonoImg(path, timestamp, imgdata):
  # jpgFile = open(NONO_IMG_FILE.format(path, timestamp), "wb")
  # jpgFile.write(img)
  # jpgFile.close()
  imgfile.saveImg(NONO_IMG_FILE.format(path, timestamp), imgdata)

def readNonoImg(imgPath, timestamp):
  return imgfile.readImg(NONO_IMG_FILE.format(imgPath, timestamp))

if __name__ == '__main__':
  imgPath, timestamp = camChannelPath(channel=1)
  print(imgPath, timestamp)
