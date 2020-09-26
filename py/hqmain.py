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

HqDateJson = '{' + '"hqdate": "{}"'.format(hqDate) + '}'
import hqutil
hqutil.writeTextFile("../src/assets/hqcsv/hqdate.json", HqDateJson)
# import sys
# sys.exit()

import hqrobot
hqrobot.run(hqConf, hqDate)

import hqday0
hqday0.run(hqConf, hqDate)

import hqhl
hqhl.run(hqConf, hqDate, [10, 30, 60, 120, 240])

# import hqcsv
# hqcsv.runHqCsvBatch(hqConf, hqDate, 15)

############################
# generate copy batch script
dst = r'\\192.168.0.110\Share\assets\hqcsv'
src = r'..\src\assets\hqcsv'
cmd = r"copy {}\hqdate.json {}".format(src, dst) + "\n"
## the generated hqcsv files below have been moved to hqDate folder
# cmd += r"copy {}\hqday0.hqcsv {}".format(src, dst) + "\n"
# cmd += r"copy {}\hqhl.hqcsv {}".format(src, dst) + "\n"
cmd += r"mkdir {}\hq{}".format(dst, hqDate) + "\n"
cmd += r"xcopy {}\hq{} {}\hq{} /q /s".format(src, hqDate, dst, hqDate) + "\n"
batchCmd = r"..\src\assets\hqcsv\copy2pi.cmd"
hqutil.writeTextFile(batchCmd, cmd)
import os
os.system(batchCmd)
