import pickle

def writePyObject(filename, pydata):
  with open(filename, 'wb') as fp:
    pickle.dump(pydata, fp)

def loadPyObject(filename):
  with open(filename, 'rb') as fp:
    return pickle.load(fp)
