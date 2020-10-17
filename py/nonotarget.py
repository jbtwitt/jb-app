import nonopath
from yolotarget import findTarget

IDX_CLASSIDS = 2
CHANNEL_WATCHES = [
  ['store', 0, [0, 56]],  # person, chair
  ['room', 1, [0]],
  ['driveway1', 2, [0, 2, 1, 3]],
  ['driveway2', 3, [0, 2, 1, 3]]  # person, car, bicycle, motorbike
]
# print(CHANNEL_WATCHES[1][IDX_CLASSIDS])

def findNonoTarget(yoloNet, urlSnapshot, url, channel):
  imgPath, timestamp = nonopath.camChannelPath(channel)
  camUrl = nonopath.NONO_URL.format(url, channel, timestamp * 1000)
  data = urlSnapshot.httpGetImg(camUrl)
  objs, matches = findTarget(yoloNet, data, CHANNEL_WATCHES[channel][IDX_CLASSIDS])
  if objs is not None:
    nonopath.saveNonoImg(imgPath, timestamp, data)
    print(imgPath, timestamp, objs, [yoloNet.classLabel(id) for id in matches])
    return imgPath, timestamp, objs, matches
  return None, None, None, None
