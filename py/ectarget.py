import imgfile
from yolotarget import findTarget
import ecpath

EC_TARGETS = [0,2,3,5,7]

def findEcTarget(yoloNet, pi, camPath, jpg):
  data = imgfile.readImgData(camPath + jpg)
  matches = findTarget(yoloNet, data, EC_TARGETS, pi[ecpath.ROTATE_IDX])
  return matches
