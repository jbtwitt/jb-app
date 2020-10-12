import time, datetime
import base64
from urllib.request import urlopen, Request, URLError
import cv2
import numpy as np
class UrlSnapshot:
  def __init__(self, url, u, p):
    credentials = ('%s:%s' % (u, p))
    self.encoded_credentials = base64.b64encode(credentials.encode('ascii'))
    # request = Request(url)
    # request.add_header('Authorization', 'Basic %s' % self.encoded_credentials.decode("ascii"))
    # response = urlopen(request)
    # data = response.read()
    # print(data)

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
    # timestamp = datetime.datetime.now()
    # jpgFilename = self.store + '/at_' + timestamp.strftime("%Y%m%d_%H%M%S_%f") + '.jpg'
    # jpgFile = open(jpgFilename, "wb")
    # jpgFile.write(data)
    # jpgFile.close()
    # return jpgFilename

from Yolo import Yolo
def runModel(modelPath, imgs):
  yoloNet = Yolo(modelPath, .3, .2)
  for img in imgs:
    objs = yoloNet.findDetectedObjects(img, (320, 320))
    # objs = yoloNet.findDetectedObjects(img, TrainedImageSize=(416, 416))
    print(objs)
    if objs is not None:
      yoloNet.drawDetectedObjects("title", img, objs)

def testRun(jbConf, u, p):
  imgs = []
  url = jbConf["nono"]['url']
  urlSnapshot = UrlSnapshot(url, u, p)
  timestamp = int(time.time() * 1000) # = new Date().getTime()
  channels = [0, 1, 2, 3]
  for channel in channels:
    imgUrl = "{}/cgi-bin/web_jpg.cgi?ch={}&{}".format(url, channel, timestamp)
    print(imgUrl)
    try:
      img = urlSnapshot.httpGetImg(imgUrl)
      print(img.shape)
      # cv2.imshow('Nono', img)
      # cv2.waitKey(0)
      imgs.append(img)
    except Exception as e:
      print(e)
  modelPath = jbConf["models"]["yolov3"]
  runModel(modelPath, imgs)

import sys
import json
if __name__ == '__main__':
  if len(sys.argv) > 2:
    jbConf = json.load(open("jbconf.json"))
    testRun(jbConf, sys.argv[1], sys.argv[2])
