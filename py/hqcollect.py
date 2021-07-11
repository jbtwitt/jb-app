from HqYhoo import DateFormat
import json
import hqutil as hqu
import hqpdutil as hqpdu

class HqCollect:
  def __init__(self, tick):
    self.collect = {
      'tick': tick,
      'defaultLastnDays': 10,
      'lldays': {}
    }
    self.pdCollect(tick)

  def pdCollect(self, tick):
      df = hqu.pdtick(tick)
      hqu.pdAddCols(df)
      # day0
      hqday0 = df.iloc[df.shape[0] - 1]
      self.collect['day0'] = {
        'date': hqday0.name.strftime(DateFormat),
        'close': hqday0.Close,
        'ccchg': hqday0.CCChg,
        'vvchg': hqday0.VVChg,
        'llchg': hqday0.LLChg,
      }
      # lldays
      dfLlDays = hqpdu.pdLlDays(df, daysAgo = self.collect['defaultLastnDays'])
      straightStart, straightEnd = hqpdu.pdStraightLlDays(dfLlDays)
      # straightDays = straightStart - straightEnd + 1
      # print(df[(df.No >= straightStart) & (df.No <= straightEnd)])
      self.collect['lldays'] = {
        'straightStart': int(straightStart),  # convert from int64 to avoid json serialization error
        'straightEnd': int(straightEnd),
        'straightLoss': ((dfLlDays[dfLlDays.No == straightStart].PrvClose[0] -
          dfLlDays[dfLlDays.No == straightEnd].Close[0]) /
          dfLlDays[dfLlDays.No == straightStart].PrvClose[0])
      }


if __name__ == "__main__":
  # ticks = hqu.hqticks('ticks.hq')
  for tick in ['BNGO', 'AVIR']:
    hqCollect = HqCollect(tick)
    # print(hqCollect.collect)
    c = json.dumps(hqCollect.collect)
    print(json.loads(c))
