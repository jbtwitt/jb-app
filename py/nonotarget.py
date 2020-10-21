import nonopath
from yoloutil import labelName
from yolotarget import findTarget

IDX_CLASSIDS = 2
CHANNEL_WATCHES = [
  ['store', 0, [0, 56]],  # person, chair
  ['room', 1, [0]],
  ['driveway1', 2, [0, 2, 7, 1, 3]],
  ['driveway2', 3, [0, 2, 7, 1, 3]]  # person, car, truck, bicycle, motorbike
]
# print(CHANNEL_WATCHES[1][IDX_CLASSIDS])

def findNonoTarget(yoloNet, urlSnapshot, url, channel):
  imgPath, timestamp = nonopath.camChannelPath(channel)
  camUrl = nonopath.NONO_URL.format(url, channel, timestamp * 1000)
  data = urlSnapshot.httpGetImg(camUrl)
  matches = findTarget(yoloNet, data, CHANNEL_WATCHES[channel][IDX_CLASSIDS])
  if len(matches):
    nonopath.saveNonoImg(imgPath, timestamp, data)
    print(imgPath, timestamp, [labelName(id) for id, _, _ in matches])
    return imgPath, timestamp, matches
  return None, None, None
