import json
from Yolo import Yolo
import ecpath, ectarget, yoloutil, imgdiff

jbConf = json.load(open("jbconf.json"))
modelPath = jbConf["models"]["yolov3"]
yoloNet = Yolo(modelPath)

def runFindTargets(pi, day, h, m, objsDiff):
  found = []
  camPath, jpgs = ecpath.getCamJpgs(pi, day, h, m)
  for jpg in jpgs:
    # print(jpg)
    matches = ectarget.findEcTarget(yoloNet, pi, camPath, jpg[0])
    if matches is not None and len(matches) > 0:
      nDiff, objDiffs = objsDiff.metaDiff(matches)
      if nDiff != 0 or imgdiff.evalObjDiffs(objDiffs):
        ecpath.copyStagedJpg(pi, camPath, jpg)
        found.append((jpg[0], jpg[1], matches))
  return camPath, found

def run(args, piId=0, h=12, start=0, duration=1):
  day = ecpath.getCamCacheDay()
  for arg in args:
    if arg[0:2] == 'pi':
      piId = int(arg[2:])
    elif arg[0] == 'h':
      h = int(arg[1:])
    elif arg[0:5] == 'start':
      start = int(arg[5:])
    elif arg[0:8] == 'duration':
      duration = int(arg[8:])
    elif arg[0:3] == 'day':
      day = int(arg[3:])
  # print(args)
  objsDiff = imgdiff.ObjsDiff()
  pi = ecpath.PIS[piId]
  for m in range(start, start + duration):
    print("%02d%02d" % (h + m/60, m % 60))
    camPath, found = runFindTargets(pi, day, h + m/60, m % 60, objsDiff)
    # if len(found) > 0:
    #   for jpg in found:
    #     yoloutil.drawImgFile(camPath + jpg[0], jpg[2], pi[ecpath.ROTATE_IDX])

if __name__ == "__main__":
  import sys
  from datetime import datetime
  print(datetime.now())
  run(sys.argv[1:])
  print(datetime.now())
