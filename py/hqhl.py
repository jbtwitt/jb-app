import hqutil
import pandas as pd
from hqrobot import CsvFolder, CsvFileName

HqHlFileNameFormatter = "{}/hq{}/hqhl.hqcsv"
HqHlHeader = "s:ticker,ndaysHL,s:date,"
HqHlHeader += "close,cChange,vChange,cl,"
HqHlHeader += "lcPos,s:lcDate,lClose,lcChange,"
HqHlHeader += "hcPos,s:hcDate,hClose,hcChange,"
HqHlHeader += "lvPos,s:lvDate,lVolume,"
HqHlHeader += "hvPos,s:hvDate,hVolume\n"
HqHlFormatter = "{}," * HqHlHeader.count(',') + "{}\n"
# print(HqHlFormatter)
def hqhlLine(ticker, df, ndays):
    df = pd.DataFrame(df.iloc[0:ndays])
    hq0Idx = df.index[0]
    hq0Row = df.loc[hq0Idx]
    vChange = hq0Row.Volume
    if vChange > 0:
        vChange = hq0Row.Volume / hq0Row.PreVolume
        # vChange = (hq0Row.Volume - hq0Row.PreVolume) / hq0Row.PreVolume
    # cl = (hq0Row.Close - hq0Row.Low) / (hq0Row.High - hq0Row.Low)
    try:
      lcIdx, hcIdx = (df.Close.idxmin(), df.Close.idxmax())
      lvIdx, hvIdx = (df.Volume.idxmin(), df.Volume.idxmax())
      lcRow, hcRow = (df.loc[lcIdx], df.loc[hcIdx])
      lvRow, hvRow = (df.loc[lvIdx], df.loc[hvIdx])
      return HqHlFormatter.format(
          ticker, ndays, hq0Idx,
          hq0Row.Close,
          (hq0Row.Close - hq0Row.PreClose) / hq0Row.PreClose,
          vChange,
          (hq0Row.Close - hq0Row.Low) / (hq0Row.High - hq0Row.Low), #CL/HL
          df.index.get_loc(lcIdx), lcIdx, lcRow.Close,
          (hq0Row.Close - lcRow.Close) / lcRow.Close,
          df.index.get_loc(hcIdx), hcIdx, hcRow.Close,
          (hq0Row.Close - hcRow.Close) / hcRow.Close,
          df.index.get_loc(lvIdx), lvIdx, lvRow.Volume,
          df.index.get_loc(hvIdx), hvIdx, hvRow.Volume
      )
    except Exception as e:
      print("{} failed".format(ticker))
      print(str(e))

def csvHqHl(ticker, csvFolder, ndaysList=[20]):
    result = ""
    csvFile = CsvFileName.format(csvFolder, ticker)
    # print(csvFile)
    df = pd.read_csv(csvFile, index_col=[0], parse_dates=False)
    df['PreClose'] = df.Close.shift(1)
    df['PreVolume'] = df.Volume.shift(1)
    df = df.reindex(index=df.index[::-1])   # reverse date order
    for ndays in ndaysList:
        result += hqhlLine(ticker, df, ndays)
    return result

def run(hqConf, hqDate, ndaysList=[10]):
    result = ""
    csvFolder = CsvFolder.format(hqConf['repo'], hqDate)
    for group in ['etf', 'idx', 'tickers', 'covid19']:
        for ticker in hqConf[group]:
            result += csvHqHl(ticker, csvFolder, ndaysList)
            # break
    hqHlFileName = HqHlFileNameFormatter.format(hqConf['repo'], hqDate)
    hqutil.writeTextFile(hqHlFileName, HqHlHeader + result)

def hqConf_main():
  hqConf = json.load(open("/gitrepo/jb/jb-app/src/assets/hqrobot.json"))
  hqDate = "20201219"
  run(hqConf, hqDate)

import json
if __name__ == "__main__":
  hqConf_main()
