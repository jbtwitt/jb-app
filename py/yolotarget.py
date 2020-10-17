import cv2
import numpy as np
import nonopath

def matchClassIds(objs, targetClassIds):
  if objs is None:
    return []
  return [classId for classId, _, _ in objs for id in targetClassIds if classId == id]
  # for classId, _, _ in objs:
  #   if classId in targetClassIds:
  #     matches.append(classId)

def findTarget(yoloNet, imgdata, classIds):
  try:
    img = cv2.imdecode(np.frombuffer(imgdata, np.uint8), cv2.IMREAD_COLOR)
    objs = yoloNet.findDetectedObjects(img)
    return objs, matchClassIds(objs, classIds)
  except Exception as e:
    print("findTarget error", e)
  return None, None
