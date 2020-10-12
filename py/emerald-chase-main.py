import cv2
import numpy as np
from urllib.request import urlopen
def httpGetImg(imgUrl):
  try:
    response = urlopen(imgUrl)
    # print(response.info())
    data = response.read()
    nparr = np.frombuffer(data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img
  except Exception as e:
    raise e

import json
def loadImgs():
  imgs = []
  pis = json.load(open("../src/assets/pi-addr.json"))
  for pi in pis:
    print(pi)
    try:
      img = httpGetImg(pi['url'])
      if pi['rotate']:
        img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
      imgs.append(img)
    except Exception as e:
      print(e)
  return imgs

from Yolo import Yolo
def run(modelPath, imgs):
  yoloNet = Yolo(modelPath)
  for img in imgs:
    objs = yoloNet.findDetectedObjects(img)
    print(objs)
    if objs is not None:
      yoloNet.drawDetectedObjects("title", img, objs)

if __name__ == '__main__':
  jbConf = json.load(open("jbconf.json"))
  modelPath = jbConf["models"]["yolov3"]
  # print(jbConf)
  run(modelPath, loadImgs())
