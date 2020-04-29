import json
from datetime import datetime, timedelta
# import hqstat

# import sys
# s = "gitrepo/jb/jb-app/src/assets/hqcsv/hq20200415/LABD.y.csv"
# i = s.find("hqcsv")
# print(s[i:])
# sys.exit()

hqconfpath = "../src/assets/hqrobot.json"
hqConf = json.load(open(hqconfpath))

hqDate = (datetime.now() + timedelta(days=-0)).strftime("%Y%m%d")
# hqDate = "20200424"

import hqrobot
hqrobot.run(hqConf, hqDate)

import hqday0
hqday0.run(hqConf, hqDate)

import hqhl
hqhl.run(hqConf, hqDate, [10, 30, 60, 120, 240])

# import hqcsv
# hqcsv.runHqCsvBatch(hqConf, hqDate, 15)
