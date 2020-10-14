CONT_PATH = "/jbdata/nono_yolo/ch{}/{}.jpg"

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
      nparr = np.frombuffer(data, np.uint8)
      img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
      return img
    except Exception as e:
      print('httpGetImg() error!')
      raise e

import time
def getImgInfo(urlSnapshot, url, channel):
  timestamp = int(time.time() * 1000)
  imgUrl = "{}/cgi-bin/web_jpg.cgi?ch={}&{}".format(url, channel, timestamp)
  try:
    return {
      'timestamp': timestamp,
      'img': urlSnapshot.httpGetImg(imgUrl)
    }
  except Exception as e:
    raise e

def saveImgInfo(channel, imgInfo):
  # getImgInfo(urlSnapshot, url, channel)
  path = CONT_PATH.format(channel, imgInfo['timestamp'])
  jpgFile = open(path, "wb")
  jpgFile.write(imgInfo['img'])
  jpgFile.close()
