# from pandas_datareader import data as pdr
import re
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import HqYhoo
import hqhl

HqRepo = "../src/assets/hqcsv/"
HqCsvRepo = HqRepo + "download/{}.csv"
HqDay0Csv = HqRepo + "hqday0.csv"
HqHlCsv = HqRepo + "hqhl.hqcsv"

def writeTextFile(path, data, dataType='w'):
  # print("creating {} ...".format(path))
  with open(path, dataType) as f:
    f.write(data)
    return path

# support comments began with #
def hqticks(path):
  with open(path, 'r') as f:
    ticks = f.read()
    # filter out comments with regular expression
    # ticks = re.sub(r"  +[-#> \w]*\n", "", ticks)
    # to an array
    # return ticks.replace("\n", "").split(',')
    return re.sub(r"#[-:#>( )\w]*\n", "", ticks).replace(" ", "").replace("\n", "").split(',')

def hqdownload(symbols, nDays=260):
  hqRobot = HqYhoo.HqYhoo()
  # today = datetime.now().strftime(DateFormat)
  today = (datetime.now() + timedelta(days=1)).strftime(HqYhoo.DateFormat)
  startDate = (datetime.now() + timedelta(days=-nDays)).strftime(HqYhoo.DateFormat)
  for symbol in symbols:
    try:
      # DataReader doesn't work 7/5/2021
      # df = pdr.DataReader(symbol, data_source="yahoo", start=startDate, end=today)
      # df.to_csv(HqCsvRepo.format(symbol))
      csv = hqRobot.hqGet(symbol, startDate, today)
      writeTextFile(HqCsvRepo.format(symbol), csv, 'wb')
    except Exception as e:
      print("{} failed: {}".format(symbol, str(e)))

def hqcsv(tick):
  with open(HqCsvRepo.format(tick), 'r') as f:
    return f.read()

def runHqDay0FromCsv(ticks):
  hqday0 = ",Symbol,Date,Open,High,Low,Close,AdjClose,Volume\n"
  for idx, tick in enumerate(ticks):
    csv = hqcsv(tick)
    lines = csv.split("\n")
    hqday0 = hqday0 + str(idx) + ',' + tick + ',' + lines[len(lines) - 1] + "\n"
  # writeTextFile(HqDay0Csv, hqday0, 'w')
  return hqday0

def pdtick(tick):
  df = pd.read_csv(HqCsvRepo.format(tick), index_col=[0], parse_dates=True)
  df['PrvClose'] = df.Close.shift(1)
  df['PrvVolume'] = df.Volume.shift(1)
  return df

def pdAddCols(df):
  df['PrvLow'] = df.Low.shift(1)
  df['PrvHigh'] = df.High.shift(1)
  df['CCChg'] = (df.Close - df.PrvClose) / df.PrvClose
  df['LLChg'] = (df.Low - df.PrvLow) / df.PrvClose
  df['HHChg'] = (df.High - df.PrvHigh) / df.PrvClose
  df['VVChg'] = df.Volume / df.PrvVolume
  df['No'] = [df.shape[0] - df.index.get_loc(idx) - 1 for idx in df.index]

def hqday0(ticks):
  hqday0 = []
  for tick in ticks:
    df = pdtick(tick)
    row = df.iloc[df.shape[0] - 1].to_numpy().tolist()
    hqday0.append([tick, df.index[df.shape[0] - 1].strftime(HqYhoo.DateFormat)] + row)
  pd.DataFrame(data=np.array(hqday0), columns=["Symbol", "Date", "High", "Low",
    "Open", "Close", "AdjClose", "Volume", "PrvClose", "PrvVolume"]).to_csv(HqDay0Csv)

def runHqhl(symbols, ndaysList=[20]):
  result = ""
  for symbol in symbols:
    df = pdtick(symbol)
    pdAddCols(df)
    df = df.reindex(index=df.index[::-1])   # reverse date order
    for ndays in ndaysList:
      result += hqhl.hqhlLine(symbol, df, ndays)
  writeTextFile(HqHlCsv, hqhl.HqHlHeader + result)

if __name__ == "__main__":
  # test
  ticks = hqticks('ticks.hq')
  print(ticks)
  # hqdownload(['AVIR'])
  # df = pdtick('AVIR')
  # row = df.iloc[df.shape[0] - 1].to_numpy().tolist()
  # print(row)
  # hqday0(['AVIR', 'MRIN'])
  # runHqhl(['AVIR', 'MRIN'])
