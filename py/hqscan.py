import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import hqop
import hqutil as hqu

HqScanResult = hqu.HqRepo + "hqscan.csv"
# symbols = """
# VSTM,ATHX,OVID,SCPS,BCRX,AGEN,NNOX,NH,VTVT,XBIO,OSMT,BNGO,FOLD,HOTH,
# JAGX,JNCE,IMGN,SNDL,VCNX,CTXR,OCGN,NVAX,ENTX,NLSP,SEEL,BNTC,CARA,AVIR,
# WATT,SPCE,ACMR,SCKT,PLTR,XM,TDC,MRIN,
# RIOT,GBTC,
# Z,RDFN,PLUG,QUBT,
# BAC,COF,TRIP,EXPE,HYLN,T,
# FSR,NKLA,RIDE,BLNK,CHPT,QS,FUV,SOLO,
# DK,GEVO,            > oil
# NUGT,LABD,ERX,SQQQ,
# USTEX,CAH,          - dividend
# ^IXIC,^GSPC,^DJI    # the 3 major index
# """


def hq_scan(symbols, withinDays=3):
  results = []
  for symbol in symbols:
    # df = pd.read_csv(HqCsvRepo.format(symbol), index_col=[0], parse_dates=True)
    df = hqu.pdtick(symbol)
    hqu.pdAddCols(df)

    # begin scan
    hqop.hq_llbcp(symbol, df, results)
    hqop.hq_hhbcn(symbol, df, results)

  return pd.DataFrame(data=np.array(results), columns=hqop.HqOpColumns)

def run(symbols, nDays=120):
  # startDate = (datetime.now() + timedelta(days=-nDays)).strftime(hqop.DateFormat)
  hqu.hqdownload(symbols, nDays)
  hqu.hqday0(symbols)
  hqu.runHqhl(symbols, [10, 20, 30, 70])
  results = hq_scan(symbols)
  results.to_csv(HqScanResult)
  print(results.sort_values(by='HqType'))


if __name__ == "__main__":
  begin = datetime.now()
  symbols = hqu.hqticks('ticks.hq')
  run(symbols)
  print(begin)
  print(datetime.now() - begin)
