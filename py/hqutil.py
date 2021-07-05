
def writeTextFile(path, data, dataType='w'):
    print("creating {} ...".format(path))
    with open(path, dataType) as f:
        f.write(data)
