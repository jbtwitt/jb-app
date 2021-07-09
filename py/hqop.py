# hq operation library
import pandas as pd
import hqutil as hqu
from HqYhoo import DateFormat

# DateFormat = "%Y-%m-%d"
HqOpColumns = ['Symbol', 'HqType', 'HqTypeDate', 'No', 'HqTypeChg',
      'Day0', 'Close', 'CChg', 'VChg',
      'CCChg', 'MetaInfo']


def hq_llbcp(symbol, df, results, withinDays=1):
  # Low Low but Close Positive
  llbcp = df[(df.LLChg < 0) & (df.Close > df.PrvClose) & (df.No < withinDays)]
  if len(llbcp) > 0:
    lastnDays = 6
    metaInfo = "LLChgs {}/{}".format(df[(df.LLChg < 0) & (df.No < lastnDays)].shape[0], lastnDays)
    for idx in llbcp.index:
      results.append((
        symbol, 'LLBCP{}'.format(withinDays), idx.strftime(DateFormat),
        llbcp.No[idx], llbcp.LLChg[idx],
        df[df.No == 0].index[0].strftime(DateFormat), df[df.No == 0].Close[0],
        df[df.No == 0].CCChg[0], df[df.No == 0].VVChg[0],
        llbcp.CCChg[idx], metaInfo))

def hq_hhbcn(symbol, df, results, withinDays=1):
  # High Hight but Close Negative
  hhbcn = df[(df.HHChg > 0) & (df.Close < df.PrvClose) & (df.No < withinDays)]
  if len(hhbcn) > 0:
    lastnDays = 6
    metaInfo = "HHChgs {}/{}".format(df[(df.HHChg > 0) & (df.No < lastnDays)].shape[0], lastnDays)
    for idx in hhbcn.index:
      results.append((
        symbol, 'HHBCN{}'.format(withinDays), idx.strftime(DateFormat),
        hhbcn.No[idx], hhbcn.HHChg[idx],
        df[df.No == 0].index[0].strftime(DateFormat), df[df.No == 0].Close[0],
        df[df.No == 0].CCChg[0], df[df.No == 0].VVChg[0],
        hhbcn.CCChg[idx], metaInfo))

def hq_high_low(df, nDays):
  df = pd.DataFrame(df[df.No < nDays])
  # lowest/highest close index
  lcIdx, hcIdx = (df.Close.idxmin(), df.Close.idxmax())
  hq0 = df[df.No == 0]
  print(hq0)
  print(df)
  print(df.loc[lcIdx])
  print(df.loc[hcIdx])

def hq_testVolume():
  from hqscan import symbols, HqCsvRepo
  for symbol in symbols:
    df = pd.read_csv(HqCsvRepo.format(symbol), index_col=[0], parse_dates=True)
    hqu.pdAddCols(df)
    # last number days on volume grow 
    # print(symbol, df.PrvVolume[df.No == 0], df.Volume[df.No == 0], df.VVChg[df.No == 0].sum())
    print(symbol, df.VVChg[df.No < 10].sum())

def hq_test():
  # symbol = "HOTH"
  df = pd.read_csv("../src/assets/hqcsv/hqhl.hqcsv", index_col=[0], parse_dates=False)
  # hq_high_low(df, nDays=10)
  print(df)

if __name__ == "__main__":
  # hq_testVolume()
  hq_test()
