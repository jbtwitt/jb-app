from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
)
#('YOUR_CHANNEL_ACCESS_TOKEN')
line_bot_api = LineBotApi('C0lIiazNf7rySCl53fbKM34UR7sE2iWpuKHjePmd3qzWTL7hRoT7XC6rVKusH/tsC7McCGoBtvyburvDGj+muDkAHVXpaZYoiSddlDb2Wn4glq048hxmJw54UZM5y3gW8sYqWlaYmO/iAcUrWTm5vAdB04t89/1O/w1cDnyilFU=')
handler = WebhookHandler('3e2962f9c4f333680f195b22cd1caa04')  #('YOUR_CHANNEL_SECRET')
to = 'The Shiao'
to = 'U9d996e741c26ed64c212ca4240429ef3'  # my user ID
msg = TextSendMessage(text='Hello From JBApp!')
print('***** send line message')
line_bot_api.push_message(to, msg)

import sys
sys.exit()

# web
from flask import Flask, request, abort

app = Flask(__name__)


@app.route("/test")
def sendtest():
  # to = ["stoaix"] # stephen
  to = '17036238336'
  to = '+1 703-623-8336'
  to = 'U9d996e741c26ed64c212ca4240429ef3'  # my user ID
  to = 'The Shiao'
  msg = TextSendMessage(text='Hello From JBApp!')
  print('***** send line message to stephen')
  line_bot_api.push_message(to, msg)
  return 'OK'

@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        print("Invalid signature. Please check your channel access token/channel secret.")
        abort(400)

    return 'OK'


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=event.message.text))


if __name__ == "__main__":
    app.run()