CONT_REPO_PATH = "/jbdata/yolo_repo/nono/ch{}/"
CONT_FILE_PATH = CONT_REPO_PATH + "{}.jpg"

import numpy as np
from urllib.request import urlopen, Request, URLError
import base64
import cv2

class UrlSnapshot:
  def __init__(self, u, p):
    credentials = ('%s:%s' % (u, p))
    self.encoded_credentials = base64.b64encode(credentials.encode('ascii'))

  def httpGetImg(self, url):
    try:
      request = Request(url)
      request.add_header('Authorization', 'Basic %s' % self.encoded_credentials.decode("ascii"))
      # print(request)
      response = urlopen(request)
      data = response.read()
      # print(len(data))
      return data
    except Exception as e:
      print('httpGetImg() error!')
      raise e

import time, datetime
def getRawImgInfo(urlSnapshot, url, channel):
  timestamp = int(time.time() * 1000)
  imgUrl = "{}/cgi-bin/web_jpg.cgi?ch={}&{}".format(url, channel, timestamp)
  try:
    return {
      'timestamp': timestamp,
      'img': urlSnapshot.httpGetImg(imgUrl)
    }
  except Exception as e:
    raise e

def getImgInfo(urlSnapshot, url, channel):
  try:
    imgInfo = getRawImgInfo(urlSnapshot, url, channel)
    nparr = np.frombuffer(imgInfo['img'], np.uint8)
    imgInfo['img'] = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return imgInfo
  except Exception as e:
    raise e

def saveImgInfo(channel, imgInfo):
  path = CONT_FILE_PATH.format(channel, imgInfo['timestamp'])
  jpgFile = open(path, "wb")
  jpgFile.write(imgInfo['img'])
  jpgFile.close()

from time import sleep
def getSaveImgInfo(urlSnapshot, url, channel=1, loop=5, sleepSeconds=.5):
  for i in range(loop):
    try:
      imgInfo = getRawImgInfo(urlSnapshot, url, channel)
      saveImgInfo(channel, imgInfo)
      sleep(sleepSeconds)
    except Exception as e:
      print('getSaveImgInfo', e)

def tsToDateTime(timestampInMilliSeconds):
  # timestamp in milli seconds
  # jsTimestamp = int(time.time() * 1000)
  return datetime.datetime.fromtimestamp(timestampInMilliSeconds / 1000)

import os
def getImgInfosFromRepo(channel):
  repo = CONT_REPO_PATH.format(channel)
  # files = [f for f in os.listdir(repo) if os.path.isdir(repo + f)]
  files = [repo + f for f in os.listdir(repo)]
  imgInfos = []
  for f in files:
    ts, _ = os.path.splitext(os.path.basename(f))
    # print(tsToDateTime(int(ts)))
    file = open(f, "rb")
    nparr = np.frombuffer(file.read(), np.uint8)
    file.close()
    imgInfos.append({
      'timestamp': ts,
      'img': cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    })
  return imgInfos

def cleanRepo(channel):
  repo = CONT_REPO_PATH.format(channel)

if __name__ == "__main__":
  imgInfos = getImgInfosFromRepo(channel=1)
  for imgInfo in imgInfos:
    cv2.imshow(str(imgInfo['timestamp']), imgInfo['img'])
    cv2.waitKey(0)
