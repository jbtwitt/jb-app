
def writeTextFile(path, text):
    print("creating {} ...".format(path))
    with open(path, 'w') as f:
        f.write(text)
