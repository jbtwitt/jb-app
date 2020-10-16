import cv2
import numpy as np
import nonopath

def findTarget(yoloNet, imgdata, classIds):
  try:
    img = cv2.imdecode(np.frombuffer(imgdata, np.uint8), cv2.IMREAD_COLOR)
    objs = yoloNet.findDetectedObjects(img)
    if objs is not None:
      for obj in objs:
        if obj['classId'] in classIds:
          return objs
      print("No target objs found", objs)
    else:
      print("Yolo found no objs")
  except Exception as e:
    print("findTarget error", e)
