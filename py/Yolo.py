'''
opencv-python 4.1.2
'''
import cv2
import numpy as np

class Yolo:
  def __init__(self, modelConf, confidence=.5, threshold=.3):
    self.modelConf = modelConf
    self.confidence = confidence
    self.threshold = threshold
    self.loadModel()

  '''
  Load Yolo Model
  '''
  def loadModel(self):
    self.net = cv2.dnn.readNetFromDarknet(
      self.modelConf["cfg"],
      self.modelConf["weights"]
    )
    # determine only the *output* layer names that we need from YOLO
    ln = self.net.getLayerNames()
    self.ln = [ln[i[0] - 1] for i in self.net.getUnconnectedOutLayers()]

  '''
  Apply Model
  # TrainedImageSize = (320, 320)
  # TrainedImageSize = (416, 416)
  # TrainedImageSize = (512, 512)
  # error below: Incorrect size of input array
  # TrainedImageSize = (52, 52)
  # TrainedImageSize = (240, 240)
  '''
  def findDetectedObjects(self, image, TrainedImageSize=(608, 608)):
  # def detect(self, image):
    (H, W) = image.shape[:2]

    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, TrainedImageSize, swapRB=True, crop=False)
    self.net.setInput(blob)
    # start = time.time()
    layerOutputs = self.net.forward(self.ln)
    # end = time.time()

    # print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    # detection output values
    boxes = []
    confidences = []
    classIDs = []

    # loop over each of the layer outputs
    for output in layerOutputs:
      # loop over each of the detections
      for detection in output:
        # extract the class ID and confidence (i.e., probability) of
        # the current object detection
        scores = detection[5:]
        classID = np.argmax(scores)
        confidence = scores[classID]
        if confidence > self.confidence:
          # scale the bounding box coordinates back relative to the
          # size of the image, keeping in mind that YOLO actually
          # returns the center (x, y)-coordinates of the bounding
          # box followed by the boxes' width and height
          box = detection[0:4] * np.array([W, H, W, H])
          (centerX, centerY, width, height) = box.astype("int")

          x = int(centerX - (width / 2))
          y = int(centerY - (height / 2))

          boxes.append([x, y, int(width), int(height)])
          confidences.append(float(confidence))
          classIDs.append(classID)

    # apply non-maxima suppression to suppress weak, overlapping bounding boxes
    objs = cv2.dnn.NMSBoxes(boxes, confidences, self.confidence, self.threshold)

    if objs is not None and len(objs) > 0:
      return [(
          int(classIDs[i]), # use int as int64 can't json serialized
          boxes[i],   # the bounding box coordinates [x, y, w, h],
          confidences[i]
        ) for i in objs.flatten()
      ]

  # def drawDetectedObjects(self, title, image, objs):
  #   if objs is not None:
  #     for classId, box, confidence in objs:
  #       x, y, w, h = box
  #       color = [int(c) for c in self.classColor(classId)]
  #       text = "{}({}): {:.4f}".format(self.classLabel(classId), classId, confidence)
  #       cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
  #       cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
  #   cv2.imshow(title, image)
  #   cv2.waitKey(0)

"""
# class members example
class BOX:
  _fields_ = [("x", float),
              ("y", float),
              ("w", float),
              ("h", float)]

  def __init__(self):
    self.x = 0

box = BOX()
box.x, box.y, box.w, box.h = (1, 0, 2, 3)
print(box.x, box.y)
"""
if __name__ == '__main__':
  import os
  import json
  import yoloutil
  jbConf = json.load(open("jbconf.json"))
  yoloNet = Yolo(jbConf["models"]["yolov3"])
  dir = "/tmp"
  # dir = '/Users/jb/ffmpeg-20191215-ed9279a-win64-static/cam/testimgs/'
  # jpgFiles = os.listdir(dir)
  jpgFiles = ["160001.jpg", 'testtrum.jpg', '10157976613_f1c8c34b07_z.jpg']
  jpgFiles = ["pi110.jpg", "pi115.jpg"]
  for jpg in jpgFiles:
    path = os.path.sep.join([dir, jpg])
    image = cv2.imread(path)
    objs = yoloNet.findDetectedObjects(image)
    print(objs)
    if objs is not None:
      yoloutil.drawObjs(path, image, objs)

DIFFDECODES = [
  'no early objs but found objs - some objs show up',     #0
  'some early objs but not found objs - something left',  #1
  'some early objs but not the same objs found',  #2
  'some early objs but less objs left',   #3
  'some early objs but more objs show',   #4
  'others'
]
class DiffYolo:
  def __init__(self, trainedImageSize=(320, 320)):
    self.trainedImageSize = trainedImageSize
    self.imgInfo = None
    self.count = 0

  def diffFoundObjs(self, objs):
    prevFoundObjs = self.imgInfo['foundObjs']
    # compare
    if prevFoundObjs is not None or objs is not None:
      if prevFoundObjs is None and objs is not None:
        return 0
      elif prevFoundObjs is not None and objs is None:
        return 1
      elif len(objs) == len(prevFoundObjs):
        for i in range(len(objs)):
          classId, _, _ = objs[i]
          prevClassId, _, _ = prevFoundObjs[i]
          if classId != prevClassId:
          # if objs[i]['classId'] != prevFoundObjs[i]['classId']:
            return 2
          #? what about same class but diff position
      elif len(objs) < len(prevFoundObjs):
        return 3
      elif len(objs) > len(prevFoundObjs):
        return 4
    # return -1

  def run(self, yoloNet, imgInfo):
    diff = None
    objs = yoloNet.findDetectedObjects(imgInfo['img'], TrainedImageSize=self.trainedImageSize)
    imgInfo['foundObjs'] = objs
    if self.count > 0:
      diff = self.diffFoundObjs(objs)
    self.imgInfo = imgInfo
    self.count = self.count + 1
    return diff

  @property
  def prevImgInfo(self):
    return self.imgInfo
