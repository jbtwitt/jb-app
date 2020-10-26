import os
import glob, shutil
from datetime import datetime, timedelta

IP_IDX = 1
ROTATE_IDX = 2
PIS = [
  (0, "192.168.0.115", True),
  (1, "192.168.0.110", False)
]
PI_URL = "http://{}:5000/pi-monitor"  # ip
CAMCACHE_PATH = r"\\{}\camCache$/{}/" # ip, piid
STAGE_PATH = "/jbdata/yolo_repo/ec/pi{}/{}/"  # piid, date
RECYCLE_DAYS = 2

def getCamCacheDay():
  return datetime.now().timetuple().tm_yday % RECYCLE_DAYS

def getCamCacheDate(pi, day=0):
  dt = datetime.fromtimestamp(
    os.path.getmtime(CAMCACHE_PATH.format(pi[IP_IDX], day))
  ).timetuple()
  return "%d%02d%02d" % (dt.tm_year, dt.tm_mon, dt.tm_mday)

def getCamCacheFiles(pi, day, h, m):
  imgPath = CAMCACHE_PATH.format(pi[IP_IDX], day)
  timePattern = "%02d%02d*.jpg" % (h, m)
  return glob.glob(imgPath + timePattern)

def getCamJpgs(pi, day, h, m):
  filesnames = []
  camPath = CAMCACHE_PATH.format(pi[IP_IDX], day)
  for s in range(0, 60, 2):
    filename = "%02d%02d%02d.jpg" % (h, m + (s/60), s % 60)
    if os.path.exists(camPath + filename):
      tm = os.path.getmtime(camPath + filename)
      filesnames.append((filename, tm))
  return camPath, filesnames

def getStagePath(pi, dt):
  path = STAGE_PATH.format(pi[0], "%d%02d%02d" % (dt.tm_year, dt.tm_mon, dt.tm_mday))
  if not os.path.exists(path):
    os.makedirs(path)
  return path

def copyStagedJpg(pi, camPath, jpg):
  file, tm = jpg
  dt = datetime.fromtimestamp(tm)
  stagePath = getStagePath(pi, dt.timetuple())
  shutil.copy(camPath + file, stagePath)

if __name__ == "__main__":
  pi = PIS[0]
  day = getCamCacheDay()
  date = getCamCacheDate(pi, day)
