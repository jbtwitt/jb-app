import hqutil
import pandas as pd
from hqrobot import CsvFolder, CsvFileName

HqDay0FileNameFormatter = "{}/hqday0.hqcsv"
HqDay0Header = "s:ticker,s:date,open,high,low,close,volume,cChange,vChange\n"
HqDay0Formatter = "{}," * HqDay0Header.count(',') + "{}\n"
# print(HqDay0Formatter)
def hqDay0Line(ticker, df):
    day0Idx = df.index[0]
    day0Row = df.loc[day0Idx]
    vChange = day0Row.Volume
    if vChange > 0:
        vChange = (day0Row.Volume - day0Row.PreVolume) / day0Row.PreVolume
    return HqDay0Formatter.format(
        ticker,
        day0Idx,
        day0Row.Open,
        day0Row.High,
        day0Row.Low,
        day0Row.Close,
        day0Row.Volume,
        (day0Row.Close - day0Row.PreClose) / day0Row.PreClose,
        vChange
    )

def csvHqDay0(ticker, csvFolder):
    csvFile = CsvFileName.format(csvFolder, ticker)
    # print(csvFile)
    df = pd.read_csv(csvFile, index_col=[0], parse_dates=False)
    df['PreClose'] = df.Close.shift(1)
    df['PreVolume'] = df.Volume.shift(1)
    df = df.reindex(index=df.index[::-1])   # reverse date order
    result = hqDay0Line(ticker, df)
    return result

def run(hqConf, hqDate):
    result = ""
    csvFolder = CsvFolder.format(hqConf['repo'], hqDate)
    for group in ['etf', 'idx', 'tickers', 'covid19']:
        for ticker in hqConf[group]:
            result += csvHqDay0(ticker, csvFolder)
            # break
    hqDay0FileName = HqDay0FileNameFormatter.format(hqConf['repo'])
    hqutil.writeTextFile(hqDay0FileName, HqDay0Header + result)

import json
if __name__ == "__main__":
    hqConf = json.load(open("/gitrepo/jb/jb-app/src/assets/hqrobot.json"))
    hqDate = "20200423"
    run(hqConf, hqDate)
