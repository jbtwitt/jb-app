import nonopath
import pyobjectfile
import yoloutil

def channelResults(date, channel=1):
  wdogFilenames = nonopath.getWdogFilenames(date)
  dateResults = []
  for wdogFile in wdogFilenames:
    _, _, results = pyobjectfile.loadPyObject(wdogFile)
    dateResults = dateResults + [
      (ch, imgPath, timestamp, objs, matches)
      for ch, imgPath, timestamp, objs, matches in results
      if ch == channel and len(matches) > 0
    ]
  return dateResults

def dateResults():
  dateResults = channelResults("20201018", channel=1)
  if len(dateResults) > 0:
    for ch, imgPath, timestamp, objs, matches in dateResults:
      print([yoloutil.labelName(id) for id in matches])
      yoloutil.drawImgFile(nonopath.getNonoImgFilename(imgPath, timestamp), objs)
