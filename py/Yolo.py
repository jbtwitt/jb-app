'''
opencv-python 4.1.2
'''
import os
import cv2
import time
import json
import numpy as np


class Yolo:
  def __init__(self, modelConf, confidence=.5, threshold=.3):
    self.modelConf = modelConf
    self.confidence = confidence
    self.threshold = threshold
    self.loadModel()

    self.LABELS = open(self.modelConf["cocoNames"]).read().strip().split("\n")
    np.random.seed(42)
    self.COLORS = np.random.randint(0, 255, size=(len(self.LABELS), 3), dtype="uint8")

  @property
  def objectLabels(self):
    return self.LABELS

  '''
  Load Yolo Model
  '''
  def loadModel(self):
    self.net = cv2.dnn.readNetFromDarknet(self.modelConf["cfg"], self.modelConf["weights"])
    # determine only the *output* layer names that we need from YOLO
    ln = self.net.getLayerNames()
    self.ln = [ln[i[0] - 1] for i in self.net.getUnconnectedOutLayers()]

  '''
  Apply Model
  # TrainedImageSize = (320, 320)
  # TrainedImageSize = (416, 416)
  # error below: Incorrect size of input array
  # TrainedImageSize = (52, 52)
  # TrainedImageSize = (240, 240)
  '''
  def findDetectedObjects(self, image, TrainedImageSize = (608, 608)):
  # def detect(self, image):
    (H, W) = image.shape[:2]

    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, TrainedImageSize, swapRB=True, crop=False)
    self.net.setInput(blob)
    # start = time.time()
    layerOutputs = self.net.forward(self.ln)
    # end = time.time()

    # print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    # detion output values
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
    if len(objs) > 0:
      objsDetected = []
      # loop over the indexes we are keeping
      for i in objs.flatten():
        # extract the bounding box coordinates
        (x, y) = (boxes[i][0], boxes[i][1])
        (w, h) = (boxes[i][2], boxes[i][3])
        obj = {
          "classId": int(classIDs[i]), # use int as int64 can't json serialized
          "box": [x, y, w, h],
          "confidence": confidences[i]
        }
        objsDetected.append(obj)
      return objsDetected

  def classLabel(self, classId):
    return self.LABELS[classId]

  def classColor(self, classId):
    return self.COLORS[classId]

  def drawDetectedObjects(self, title, image, objs):
    if len(objs) > 0:
      for obj in objs:
        classId = obj['classId']
        x, y, w, h = obj["box"]
        color = [int(c) for c in self.classColor(classId)] # self.COLORS[classId]]
        text = "{}({}): {:.4f}".format(self.classLabel(classId), classId, obj["confidence"])
        cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
        cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
      cv2.imshow(title, image)
      cv2.waitKey(0)

if __name__ == '__main__':
  jbConf = json.load(open("jbconf.json"))
  # yoloNet = Yolo(jbConf["models"]["yolov3-spp"])
  yoloNet = Yolo(jbConf["models"]["yolov3"])
  # dir = '/Users/jb/ffmpeg-20191215-ed9279a-win64-static/cam/testimgs/'
  # jpgFiles = os.listdir(dir)
  dir = "/tmp"
  jpgFiles = ["160001.jpg", 'testtrum.jpg', '10157976613_f1c8c34b07_z.jpg']
  jpgFiles = ["pi110.jpg", "pi115.jpg"]
  # jpgFiles = ["nono-ch1.jpg", "nono-ch2.jpg", "nono-ch3.jpg", "nono-ch4.jpg"]
  # dir = "/tmp/testimgs"
  # dir = "/tmp/resizeImgs"
  # jpgFiles = ["170933.jpg", "170935.jpg", "170938.jpg"]
  # jpgFiles = ['nono_1.jpg', 'nono_4.jpg']
  # jpgFiles = os.listdir(dir)
  for jpg in jpgFiles:
    path = os.path.sep.join([dir, jpg])
    image = cv2.imread(path)
    objs = yoloNet.findDetectedObjects(image)
    print(objs)
    if objs is not None:
      yoloNet.drawDetectedObjects(path, image, objs)
