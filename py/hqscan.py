import pandas as pd
from pandas_datareader import data as pdr
from datetime import datetime, timedelta
import numpy as np

DateFormat = "%Y-%m-%d"
HqRepo = "/home/jb/hq/download/{}.csv"
HqResultRepo = "/home/jb/hq/"
HqScanResult = HqResultRepo + "hqscan.csv"
symbols = """VSTM,WATT,ATHX,OVID,SCPS,BCRX,AGEN,NNOX,NH,VTVT,XBIO,OSMT,BNGO,FOLD,HOTH,JAGX,JNCE,
XM,SPCE,GEVO,BLNK"""

symbols = symbols.replace("\n", "").split(',')

def hqdownload(symbols, startDate):
  today = datetime.now().strftime(DateFormat)
  for symbol in symbols:
    df = pdr.DataReader(symbol, data_source="yahoo", start=startDate, end=today)
    df.to_csv(HqRepo.format(symbol))

def hq_llbcp(symbol, df, results, withinDays=2):
  # Low Low but Close Positive
  llbcp = df[(df.LowSlope < 0) & (df.Close > df.PrvClose) & (df.No < withinDays)]
  if len(llbcp) > 0:
    for idx in llbcp.index:
      results.append((symbol, 'LLBCP', idx.strftime(DateFormat), llbcp.No[idx]))

def hq_hhbcn(symbol, df, results, withinDays=2):
  # High Hight but Close Negative
  hhbcn = df[(df.HighSlope > 0) & (df.Close < df.PrvClose) & (df.No < withinDays)]
  if len(hhbcn) > 0:
    for idx in hhbcn.index:
      results.append((symbol, 'HHBCN', idx.strftime(DateFormat), hhbcn.No[idx]))

def hq_scan(symbols, withinDays=3):
  results = []
  for symbol in symbols:
    df = pd.read_csv(HqRepo.format(symbol), index_col=[0], parse_dates=True)
    df['PrvClose'] = df.Close.shift(1)
    df['PrvLow'] = df.Low.shift(1)
    df['PrvHigh'] = df.High.shift(1)
    df['LowSlope'] = (df.Low - df.PrvLow) / df.PrvClose
    df['HighSlope'] = (df.High - df.PrvHigh) / df.PrvClose
    df['No'] = [df.shape[0] - df.index.get_loc(idx) - 1 for idx in df.index]
    df.to_csv(HqRepo.format(symbol))

    # begin scan
    hq_llbcp(symbol, df, results)
    hq_hhbcn(symbol, df, results)

  return pd.DataFrame(data=np.array(results), columns=['Symbol', 'HqType', 'Date', 'No'])

def run(symbols, nDays=90):
  startDate = (datetime.now() + timedelta(days=-nDays)).strftime(DateFormat)
  hqdownload(symbols, startDate)
  results = hq_scan(symbols)
  results.to_csv(HqScanResult)
  print(results.sort_values(by='HqType'))

if __name__ == "__main__":
  begin = datetime.now()
  run(symbols)
  print(begin)
  print(datetime.now() - begin)
