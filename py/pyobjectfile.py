import pickle

def writePyObject(filename, pydata):
  with open('outfile', 'wb') as fp:
    pickle.dump(pydata, fp)

def loadPyObject(filename):
  with open('outfile', 'rb') as fp:
    return pickle.load(fp)
