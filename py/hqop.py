# hq operation library

DateFormat = "%Y-%m-%d"
HqOpColumns = ['Symbol', 'HqType', 'HqTypeDate', 'No', 'HqTypeChg',
      'Day0', 'Close', 'CCChg', 'MetaInfo']

def hq_addCols(df):
  df['PrvClose'] = df.Close.shift(1)
  df['PrvLow'] = df.Low.shift(1)
  df['PrvHigh'] = df.High.shift(1)
  df['PrvVolume'] = df.Volume.shift(1)
  df['CCChg'] = (df.Close - df.PrvClose) / df.PrvClose
  df['LLChg'] = (df.Low - df.PrvLow) / df.PrvClose
  df['HHChg'] = (df.High - df.PrvHigh) / df.PrvClose
  df['VVChg'] = df.Volume - df.PrvVolume
  df['No'] = [df.shape[0] - df.index.get_loc(idx) - 1 for idx in df.index]

def hq_llbcp(symbol, df, results, withinDays=2):
  # Low Low but Close Positive
  llbcp = df[(df.LLChg < 0) & (df.Close > df.PrvClose) & (df.No < withinDays)]
  if len(llbcp) > 0:
    lastnDays = 5
    metaInfo = "LLChgs {}/{}".format(df[(df.LLChg < 0) & (df.No < lastnDays)].shape[0], lastnDays)
    for idx in llbcp.index:
      results.append((
        symbol, 'LLBCP{}'.format(withinDays), idx.strftime(DateFormat),
        llbcp.No[idx], llbcp.LLChg[idx],
        df[df.No == 0].index[0].strftime(DateFormat), df[df.No == 0].Close[0],
        llbcp.CCChg[idx], metaInfo))

def hq_hhbcn(symbol, df, results, withinDays=2):
  # High Hight but Close Negative
  hhbcn = df[(df.HHChg > 0) & (df.Close < df.PrvClose) & (df.No < withinDays)]
  if len(hhbcn) > 0:
    lastnDays = 5
    metaInfo = "HHChgs {}/{}".format(df[(df.HHChg > 0) & (df.No < lastnDays)].shape[0], lastnDays)
    for idx in hhbcn.index:
      results.append((
        symbol, 'HHBCN{}'.format(withinDays), idx.strftime(DateFormat),
        hhbcn.No[idx], hhbcn.HHChg[idx],
        df[df.No == 0].index[0].strftime(DateFormat), df[df.No == 0].Close[0],
        hhbcn.CCChg[idx], metaInfo))

def hq_testVolume():
  import pandas as pd
  from hqscan import symbols, HqCsvRepo
  for symbol in symbols:
    df = pd.read_csv(HqCsvRepo.format(symbol), index_col=[0], parse_dates=True)
    hq_addCols(df)
    # last number days on volume grow 
    # print(symbol, df.PrvVolume[df.No == 0], df.Volume[df.No == 0], df.VVChg[df.No == 0].sum())
    print(symbol, df.VVChg[df.No < 10].sum())

if __name__ == "__main__":
  hq_testVolume()
