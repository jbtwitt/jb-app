import numpy as np
import pandas as pd
import hqutil as hqu

def pdLlbcp(df, withinDays):
  return df[(df.LLChg < 0) & (df.Close > df.PrvClose) & (df.No < withinDays)]  # Low Low but Close Positive (llbcp) within default 1 day

# close low low days
def pdLlDays(df, daysAgo):
  return df[(df.LLChg < 0) & (df.No < daysAgo)]  # Low Low days since last n days

# volume high high days
def pdVhhDays(df, daysAgo):
  return df[(df.VVChg > 1) & (df.No < daysAgo)]

# LL days in a row
def pdStraightLlDays(llDays):
  llDays = pd.DataFrame(data=llDays)
  llDays['NextNo'] = llDays.No.shift(1)
  llDays['NoStep'] = llDays.NextNo - llDays.No          # next day indicator if eq 1
  llDays = llDays.reindex(index=llDays.index[::-1])     # reverse date order
  return llDays[llDays.NoStep != 1].No[0], llDays.No[0] # return straightStart, straightEnd

if __name__ == "__main__":
  # ticks = hqu.hqticks('ticks.hq')
  for tick in ['BNGO', 'AVIR']:
    df = hqu.pdtick(tick)
    # df = hqu.pdtickDateAgo(tick, '2021-07-07')
    hqu.pdAddCols(df)
    # print(df.shape)

    # # test llbcp
    # llbcp = pdLlbcp(df, 50)
    # print(llbcp)

    # # test pdStraightLlDays
    # llDays = pdLlDays(df, daysAgo=10)
    # straightStart, straightEnd = pdStraightLlDays(llDays)
    # print(df[(df.No >= straightStart) & (df.No <= straightEnd)])

    # print(tick, 'straight LL days:', straightLlDays)
    # print('percent diff:', 100 *
    #   (llDays[llDays.No == 0].Close[0] - df[df.No == straightLlDays].Close[0]) /
    #   df[df.No == straightLlDays].Close[0], '%')
