import cv2
import numpy as np
import nonopath

def matchClassIds(objs, targetClassIds):
  if objs is None:
    return []
  return [
    (classId, box, confidence)
    for classId, box, confidence in objs for id in targetClassIds
    if classId == id
  ]

def findTarget(yoloNet, imgdata, classIds, rotate=False):
  try:
    img = cv2.imdecode(np.frombuffer(imgdata, np.uint8), cv2.IMREAD_COLOR)
    if rotate:
      img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
    objs = yoloNet.findDetectedObjects(img)
    return matchClassIds(objs, classIds)
  except Exception as e:
    print("findTarget error", e)
  return None, None
