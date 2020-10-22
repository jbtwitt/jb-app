import cv2
import numpy as np

labelFile = '/jbdata/darknet_models/coco.names'
YOLO_LABELS = open(labelFile).read().strip().split("\n")
np.random.seed(42)
COLORS = np.random.randint(0, 255, size=(len(YOLO_LABELS), 3), dtype="uint8")

def labelName(classId):
  return YOLO_LABELS[classId]

def drawObjs(title, img, objs):
  if objs is not None:
    for classId, box, confidence in objs:
      x, y, w, h = box
      color = [int(c) for c in COLORS[classId]]
      # text = "{}({}): {:.4f}".format(labelName(classId), classId, confidence)
      text = "{} {} {} {} {}".format(classId, x, y, w, h)
      cv2.rectangle(img, (x, y), (x + w, y + h), color, 1)
      cv2.putText(img, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
  cv2.imshow(title, img)
  cv2.waitKey(0)

def drawImgFile(imgPath, objs):
  img = cv2.imread(imgPath)
  drawObjs(imgPath, img, objs)

if __name__ == '__main__':
  for i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 28, 26, 56, 58, 59, 62, 75]:
    print('classId', i, labelName(i))
