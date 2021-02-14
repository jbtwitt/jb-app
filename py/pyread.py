import pyttsx3
import PyPDF2

pdfpath = r"/Users/jb/Desktop/book pdf/"
# pdfpath = pdfpath + "understanding-machine-learning-theory-algorithms.pdf"
# pdfpath = pdfpath + r"An Introduction to Statistical Learning.pdf"
# pdfpath = pdfpath + r"The Elements of Statistical Learning.pdf"
pdfpath = pdfpath + r"artofwarsuntzudotcom-1stChapter.pdf"
book = open(pdfpath, "rb")
pdfReader = PyPDF2.PdfFileReader(book)
pages = pdfReader.numPages
print(pages)
speaker = pyttsx3.init()
for num in range(1):#pages:
  page = pdfReader.getPage(num)
  text = page.extractText()
  speaker.say(text)
  speaker.runAndWait()
