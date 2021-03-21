import pandas as pd
from pandas_datareader import data as pdr
from datetime import datetime, timedelta
import numpy as np
import hqop

HqRepo = "../src/assets/hqcsv/"
HqCsvRepo = HqRepo + "download/{}.csv"
HqScanResult = HqRepo + "hqscan.csv"
HqDay0Csv = HqRepo + "hqday0.csv"
HqHlCsv = HqRepo + "hqhl.hqcsv"
HqDay0Columns = ["Symbol", "Date", "High", "Low", "Open", "Close",
                "AdjClose", "Volume", "PrvClose", "PrvVolume"]
symbols = """
VSTM,ATHX,OVID,SCPS,BCRX,AGEN,NNOX,NH,VTVT,XBIO,OSMT,BNGO,FOLD,HOTH,
JAGX,JNCE,IMGN,SNDL,VCNX,CTXR,OCGN,NVAX,ENTX,NLSP,SEEL,
WATT,SPCE,ACMR,SCKT,PLTR,XM,
RIOT,GBTC,
Z,RDFN,PLUG,QUBT,
BAC,COF,TRIP,EXPE,HYLN,
FSR,NKLA,RIDE,BLNK,CHPT,QS,
DK,GEVO,
NUGT,LABD,ERX,SQQQ
"""

# symbols = "ATHX"

symbols = symbols.replace("\n", "").split(',')

def hqdownload(symbols, startDate):
  today = datetime.now().strftime(hqop.DateFormat)
  for symbol in symbols:
    df = pdr.DataReader(symbol, data_source="yahoo", start=startDate, end=today)
    df.to_csv(HqCsvRepo.format(symbol))

def hq_day0(symbol, df, hqday0):
  # row to array
  row = df.iloc[df.shape[0] - 1].to_numpy().tolist()
  hqday0.append([symbol, df.index[df.shape[0] - 1].strftime(hqop.DateFormat)] + row)

def hq_scan(symbols, withinDays=3):
  results, hqday0 = [], []
  for symbol in symbols:
    df = pd.read_csv(HqCsvRepo.format(symbol), index_col=[0], parse_dates=True)
    df['PrvClose'] = df.Close.shift(1)
    df['PrvVolume'] = df.Volume.shift(1)
    hq_day0(symbol, df, hqday0)
    hqop.hq_addCols(df)

    # begin scan
    hqop.hq_llbcp(symbol, df, results)
    hqop.hq_hhbcn(symbol, df, results)

  return (pd.DataFrame(data=np.array(results), columns=hqop.HqOpColumns),
          pd.DataFrame(data=np.array(hqday0), columns=HqDay0Columns))

def run(symbols, nDays=120):
  startDate = (datetime.now() + timedelta(days=-nDays)).strftime(hqop.DateFormat)
  hqdownload(symbols, startDate)
  results, hqday0 = hq_scan(symbols)
  results.to_csv(HqScanResult)
  hqday0.to_csv(HqDay0Csv)
  print(results.sort_values(by='HqType'))

import hqhl
import hqutil
def run_hqhl(symbols, ndaysList=[20]):
  result = ""
  for symbol in symbols:
    df = pd.read_csv(HqCsvRepo.format(symbol), index_col=[0], parse_dates=False)
    df['PreClose'] = df.Close.shift(1)
    df['PreVolume'] = df.Volume.shift(1)
    df = df.reindex(index=df.index[::-1])   # reverse date order
    for ndays in ndaysList:
      result += hqhl.hqhlLine(symbol, df, ndays)
  hqutil.writeTextFile(HqHlCsv, hqhl.HqHlHeader + result)

if __name__ == "__main__":
  begin = datetime.now()
  # run(symbols)
  run_hqhl(symbols, [10, 20, 30, 70])
  print(begin)
  print(datetime.now() - begin)
