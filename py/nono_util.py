import os
import time, datetime
import numpy as np
from urllib.request import urlopen, Request, URLError
import base64
import cv2
import imgfile
from nonopath import NONO_URL

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


def getRawImgInfo(urlSnapshot, url, channel):
  timestamp = int(time.time() * 1000)
  imgUrl = NONO_URL.format(url, channel, timestamp)
  try:
    img = urlSnapshot.httpGetImg(imgUrl)
    return {
      'timestamp': timestamp,
      'img': img
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

if __name__ == "__main__":
  pass
