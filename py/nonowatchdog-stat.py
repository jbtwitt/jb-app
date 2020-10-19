import nonopath
import pyobjectfile
import yoloutil

wdogFilenames = nonopath.getWdogFilenames()
c1 = []
for wdogFile in wdogFilenames:
  startTime, endTime, results = pyobjectfile.loadPyObject(wdogFile)
  print(startTime)
  print(endTime)
  channel = 1
  c1 = c1 + [(ch, imgPath, timestamp, objs, matches) for ch, imgPath, timestamp, objs, matches in results if ch == channel and len(matches) > 0]

if len(c1) > 0:
  for ch, imgPath, timestamp, objs, matches in c1:
    print([yoloutil.labelName(id) for id in matches])
    yoloutil.drawImgFile(nonopath.getNonoImgFilename(imgPath, timestamp), objs)
