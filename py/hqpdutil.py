import hqutil as hqu

def pdLlDays(df, daysAgo):
  return df[(df.LLChg < 0) & (df.No < daysAgo)]  # Low Low days since last n days

# LL days in a row
def straightLlDays(llDays):
  for pos, idx in enumerate(llDays.index):
    # print(pos, llDays.shape[0] - pos, idx, llDays.No[idx])
    straightDays = llDays.shape[0] - pos
    if llDays.No[idx] == straightDays - 1:
      return straightDays

if __name__ == "__main__":
  for tick in ['BNGO', 'AVIR', 'OVID']:
    df = hqu.pdtick(tick)
    hqu.pdAddCols(df)
    # print(pdLlDays(df, daysAgo = 10))
    # print(straightLlDays(df, lastnDays=10))
    straightDays = straightLlDays(pdLlDays(df, daysAgo=10))
    print(tick, 'straight LL days:', straightDays)
