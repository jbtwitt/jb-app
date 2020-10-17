import cv2
import numpy as np
import nonopath

def matchClassIds(objs, targetClassIds):
  matches = []
  if objs is not None:
    for classId, _, _ in objs:
      if classId in targetClassIds:
        matches.append(classId)
  return matches

def findTarget(yoloNet, imgdata, classIds):
  try:
    img = cv2.imdecode(np.frombuffer(imgdata, np.uint8), cv2.IMREAD_COLOR)
    objs = yoloNet.findDetectedObjects(img)
    return objs, matchClassIds(objs, classIds)
  except Exception as e:
    print("findTarget error", e)
  return None, None

# print([f for f in [1,2,3] if f >= 2])
# t = [(1,[0],2)]
# for a,b,c in t:
#   print(a,b,c)
