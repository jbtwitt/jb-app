import os
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import subprocess
from hqscan import HqCsvRepo, HqScanResult
import hqop

YhooChart = "https://finance.yahoo.com/chart/"

def browser(symbol):
  cmd = "firefox' --new-tab {}{}"
  if os.name == 'nt':
    cmd = r"\Users\jb\AppData\Local\GabAI\Dissenter\Application\dissenter.exe {}{}"
  subprocess.Popen(cmd.format(YhooChart, symbol), shell=True)

def hq_LLChg(symbol):
  df = pd.read_csv(HqCsvRepo.format(symbol), index_col=[0], parse_dates=True)
  hqop.hq_addCols(df)

  plt.figure(figsize=[13, 9]) # width and height in inches
  plt.suptitle('{} ({} days) - LLChg Distribution'.format(symbol, df.shape[0]), fontsize=18)

  plt.subplot(311)
  #plt.plot(range(df.shape[0]), df.LLChg, 'g', linewidth=1)
  #plt.hlines(0, 0, df.shape[0], colors='r')
  plt.plot(df.LLChg, color='g', linewidth=1)
  plt.plot(df.LLChg, 'go', markersize=3)
  plt.hlines(0, df.index[0], df.index[df.shape[0]-1], colors='r')

  #markerData = df.LLChg[df.LLChg.isin([0])] # marker where slope = 0
  markerData = df.LLChg[(df.LLChg < 0.01) & (df.LLChg >= 0)] # less than -1%
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
  for symbol in df.Symbol[df.HqType == 'LLBCP2']:
    hq_LLChg(symbol)

if __name__ == "__main__":
  import sys
  print("usage: python {} [symbol]".format(sys.argv[0]))
  if len(sys.argv) > 1:
    for symbol in sys.argv[1:]:
      symbol = symbol.upper()
      browser(symbol)
      if os.path.exists(HqCsvRepo.format(symbol)):
        hq_LLChg(symbol)
  else:
    plotLLBCPs()
