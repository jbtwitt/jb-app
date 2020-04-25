import os
import json
from datetime import datetime
from datetime import timedelta
from time import sleep
from HqYhoo import HqYhoo, DateFormat

CsvFolder = "{}/hq{}"
CsvFileName = "{}/{}.y.csv"

"""
robot download hq data and store in csv format

:param hqConf: hq conf json
:param day: folder name for the day
:param tickerList: key name of ticker list
:returns:
"""
def hqrobotMain(hqConf, day, tickerList="tickers"):
    tickers = hqConf[tickerList]
    hqDays = 7 * hqConf["hqDays"] / 5
    # repo = hqConf["repo"] + '/hq' + datetime.now().strftime("%Y%m%d")
    repo = CsvFolder.format(hqConf["repo"], day)
    if not os.path.exists(repo):
        os.makedirs(repo)
    today = (datetime.now() + timedelta(days=1)).strftime(DateFormat)
    startDate = (datetime.now() + timedelta(days=-hqDays)).strftime(DateFormat)
    print("date range", startDate, today)
    hqRobot = HqYhoo()
    for ticker in tickers:
        try:
            csv = hqRobot.hqGet(ticker, startDate, today)
            output = CsvFileName.format(repo, ticker)
            with open(output, 'wb') as f:
                f.write(csv)
            print("{} ...".format(ticker))

        except:
            print("{} failed".format(ticker))
            break
        sleep(hqConf["sleep"])

    # hqMetaFileCreate(hqConf, day)

# from HqMeta import HqMeta
# from HqMetaFile import HqMetaFile
# def hqMetaFileCreate(hqConf, day):
#     tickers = hqConf["tickers"]
#     csvFolder = CsvFolder.format(hqConf['repo'], day)
#     hqMetas = []
#     for ticker in tickers:
#         hqFile = CsvFileName.format(csvFolder, ticker)
#         if os.path.exists(hqFile):
#             hqMeta = HqMeta(ticker, hqFile)
#             hqMetas.append(hqMeta.collect())
#     hqMetaFile = HqMetaFile(hqConf, day)
#     hqMetaFile.writeJson(hqMetas)

def run(hqConf, day):
    print(day, 'hq date folder')
    for group in ['etf', 'idx', 'tickers', 'covid19']:
        hqrobotMain(hqConf, day, tickerList=group)

if __name__ == '__main__':
    jbconf = json.load(open("./jbconf.json"))
    day = (datetime.now() + timedelta(days=-0)).strftime("%Y%m%d")
    hqConf = json.load(open(jbconf["hqrobot"]["hqconf"]))
    run(hqConf, day)
