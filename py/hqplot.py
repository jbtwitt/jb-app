import matplotlib.pyplot as plt
import pandas as pd
from hqscan import HqRepo, HqScanResult
import numpy as np

def hq_lowslope(symbol):
  df = pd.read_csv(HqRepo.format(symbol), index_col=[0], parse_dates=True)
  df['PrvLow'] = df.Low.shift(1)
  df['LowSlope'] = (df.Low - df.PrvLow) / df.PrvClose

  plt.figure(figsize=[13, 9]) # width and height in inches
  plt.suptitle(symbol + ' - Low Slope Distribution', fontsize=18)

  plt.subplot(311)
  #plt.plot(range(df.shape[0]), df.LowSlope, 'g', linewidth=1)
  #plt.hlines(0, 0, df.shape[0], colors='r')
  plt.plot(df.LowSlope, color='g', linewidth=1)
  plt.plot(df.LowSlope, 'go', markersize=3)
  plt.hlines(0, df.index[0], df.index[df.shape[0]-1], colors='r')

  #markerData = df.LowSlope[df.LowSlope.isin([0])] # marker where slope = 0
  markerData = df.LowSlope[(df.LowSlope < 0.01) & (df.LowSlope >= 0)] # less than -1%
  plt.plot(markerData, 'ko', markersize=5, label=markerData.index)
  plt.legend(loc='upper left')
  plt.ylabel('(Low - PrvLow)/PrvClose', fontsize=12)

  plt.subplot(312)
  plt.plot(df.Low, color='g', label="Low")
  plt.plot(df.Low, 'go', markersize=3)
  plt.plot(df.Close, color='b', label="Close")
  plt.plot(df.Close, 'bo', markersize=3)
  plt.vlines(df.index, 1.7, df.Close, color="y", linestyle=(0, (1, 3)))#'dotted'
  plt.legend(loc="upper left")
            
  plt.subplot(313)
  plt.vlines(df.index, 1000, df.Volume)
  plt.ylabel('Volume', fontsize=12)

  plt.xlabel('Date', fontsize=14)
  plt.show()

def plotLLBCPs():
  df = pd.read_csv(HqScanResult, header=0, index_col=[0], parse_dates=False)
  print(df)
  for symbol in df.Symbol[df.HqType == 'LLBCP']:
    hq_lowslope(symbol)

if __name__ == "__main__":
  import sys
  if len(sys.argv) > 1:
    hq_lowslope(sys.argv[1])
  else:
    plotLLBCPs()
