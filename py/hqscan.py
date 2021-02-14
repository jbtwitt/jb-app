import pandas as pd
from pandas_datareader import data as pdr
from datetime import datetime, timedelta
import numpy as np
import hqop

HqRepo = "../src/assets/hqcsv/"
HqCsvRepo = HqRepo + "download/{}.csv"
HqScanResult = HqRepo + "hqscan.csv"
symbols = """
VSTM,WATT,ATHX,OVID,SCPS,BCRX,AGEN,NNOX,NH,VTVT,XBIO,OSMT,BNGO,FOLD,HOTH,JAGX,JNCE,
XM,SPCE,GEVO,BLNK
"""

symbols = symbols.replace("\n", "").split(',')

def hqdownload(symbols, startDate):
  today = datetime.now().strftime(hqop.DateFormat)
  for symbol in symbols:
    df = pdr.DataReader(symbol, data_source="yahoo", start=startDate, end=today)
    df.to_csv(HqCsvRepo.format(symbol))

def hq_scan(symbols, withinDays=3):
  results = []
  for symbol in symbols:
    df = pd.read_csv(HqCsvRepo.format(symbol), index_col=[0], parse_dates=True)
    hqop.hq_addCols(df)

    # begin scan
    hqop.hq_llbcp(symbol, df, results)
    hqop.hq_hhbcn(symbol, df, results)

  return pd.DataFrame(data=np.array(results), columns=hqop.HqOpColumns)

def run(symbols, nDays=120):
  startDate = (datetime.now() + timedelta(days=-nDays)).strftime(hqop.DateFormat)
  hqdownload(symbols, startDate)
  results = hq_scan(symbols)
  results.to_csv(HqScanResult)
  print(results.sort_values(by='HqType'))

if __name__ == "__main__":
  begin = datetime.now()
  run(symbols)
  print(begin)
  print(datetime.now() - begin)
