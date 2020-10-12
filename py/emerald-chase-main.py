import json
import cv2
from Yolo import Yolo

import numpy as np
from urllib.request import urlopen
def httpGetImg(imgUrl):
  response = urlopen(imgUrl)
  # print(response.info())
  data = response.read()
  nparr = np.frombuffer(data, np.uint8)
  img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
  return img

def run(modelConf, piUrl):
  yoloNet = Yolo(modelConf)
  img = httpGetImg(piUrl)
  img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
  # cv2.imshow("PiUrl", img)
  # cv2.waitKey(0)
  objs = yoloNet.findDetectedObjects(img)
  print(objs)
  if objs is not None:
    yoloNet.drawDetectedObjects("title", img, objs)

if __name__ == '__main__':
  jbConf = json.load(open("jbconf.json"))
  # print(jbConf)
  # piAddrs = json.load(open("../src/assets/pi-addr.json"))
  # print(piAddrs)
  pi115Url = "http://192.168.0.115:5000/pi-monitor"
  run(jbConf["models"]["yolov3"], pi115Url)
