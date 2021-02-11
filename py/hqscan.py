import pandas as pd
from pandas_datareader import data as pdr
from datetime import datetime, timedelta

DateFormat = "%Y-%m-%d"
HqRepo = "/tmp/hq/{}.csv"
symbols = """VSTM,WATT,ATHX,OVID,SCPS,BCRX,AGEN,NNOX,NH,
XM,SPCE,GEVO"""

symbols = symbols.replace("\n", "").split(',')

def hqdownload(symbols, startDate):
  today = datetime.now().strftime(DateFormat)
  for symbol in symbols:
    df = pdr.DataReader(symbol, data_source="yahoo", start=startDate, end=today)
    df.to_csv(HqRepo.format(symbol))

def hqscan(symbols):
  for symbol in symbols:
    df = pd.read_csv(HqRepo.format(symbol), index_col=[0], parse_dates=True)
    df['PrvClose'] = df.Close.shift(1)
    df['PrvLow'] = df.Low.shift(1)
    df['LowSlope'] = (df.Low - df.PrvLow) / df.PrvClose
    df['No'] = [df.shape[0] - df.index.get_loc(idx) for idx in df.index]

    # Low Low but Close Positive
    llbcp = df[(df.LowSlope < 0) & (df.Close > df.PrvClose) & (df.No < 3)]
    if len(llbcp) > 0:
      print("*** " + symbol)
      print(llbcp)

def run_hqdownload(symbols, nDays=30):
  startDate = (datetime.now() + timedelta(days=-nDays)).strftime(DateFormat)
  hqdownload(symbols, startDate)

if __name__ == "__main__":
  # run_hqdownload(symbols)
  hqscan(symbols)
