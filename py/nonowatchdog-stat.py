import nonopath
import pyobjectfile
import yoloutil

def channelResults(date, channel=1):
  wdogFilenames = nonopath.getWdogFilenames(date)
  dateResults = []
  for wdogFile in wdogFilenames:
    _, _, results = pyobjectfile.loadPyObject(wdogFile)
    dateResults = dateResults + [
      (ch, imgPath, timestamp, matches)
      for ch, imgPath, timestamp, matches in results
      if ch == channel
    ]
  return dateResults

def dateResults():
  import numpy as np
  import imgdiff
  objsDiff = imgdiff.ObjsDiff()
  for channel in [0]:# [0, 1, 2, 3]:
    dateResults = channelResults("202010221", channel)
    print('channel:', channel, 'results:', len(dateResults))
    if len(dateResults) > 0:
      for ch, imgPath, timestamp, matches in dateResults:
        nDiff, objDiffs = objsDiff.metaDiff(matches)
        if nDiff != 0 or imgdiff.evalObjDiffs(objDiffs):
          print('---', matches, nDiff, objDiffs)
          yoloutil.drawImgFile(nonopath.getNonoImgFilename(imgPath, timestamp), matches)
          # break
        else:
          print('   ', matches, nDiff, objDiffs)


if __name__ == '__main__':
  dateResults()
