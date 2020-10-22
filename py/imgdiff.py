# box and box position diffs
def boxDiffs(box1, box2):
  x1, y1, w1, h1 = box1
  x2, y2, w2, h2 = box2
  area1 = w1 * h1
  area2 = w2 * h2
  return abs(area1 - area2) / min(area1, area2), abs(x1 - x2) + abs(y1 - y2)

def evalObjDiffs(objDiffs, boxEval=.1, posEval=10):
  # objDiff: classId, box and box position diffs
  for idDiff, (boxDiff, posDIff) in objDiffs:
    if idDiff or boxDiff > boxEval:
      return True
    elif posDIff > posEval:
      return True
  return False

class ObjsDiff:
  def __init__(self):
    self.objs = None

  @property
  def prevObjs(self):
    return self.objs

  def metaDiff(self, objs):
    # 1 number of objs diff
    # 2 classId, box and box position diffs
    nDiff, objDiffs = (False, [])
    if self.objs is not None:
      nDiff = len(objs) != len(self.objs)
      objDiffs = [
        (id1 != id2, boxDiffs(box1, box2))
        for id1, box1, _ in objs for id2, box2, _ in self.objs
      ]
    self.objs = objs
    return nDiff, objDiffs
