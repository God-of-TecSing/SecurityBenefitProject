import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
from flask import Flask,jsonify,request,render_template,send_from_directory
bp = Flask(__name__, static_url_path='')
from datetime import date, timedelta

def getticker():
    print("Input a stock")
    ticker = input()
    return ticker

def getTimeSpan():
    print("Input a number for a length of time")
    print("1. Week")
    print("2. Month")
    print("3. Year")
    print("4. 5 Years")
    timespan = int(input())
    return timespan

def getBeginningDate(timespan):
    if timespan == 1:
        beginning = (date.today()-timedelta(days = 7)).isoformat()
    elif timespan == 2:
        beginning = (date.today()-timedelta(days = 30)).isoformat()
    elif timespan == 3:
        beginning = (date.today()-timedelta(weeks = 52)).isoformat()
    elif timespan == 4:
        beginning = (date.today()-timedelta(weeks = 260)).isoformat()
    return beginning

def getplotname(ticker,timespan):
    if(timespan == 1):
        timeplotname = "week"
    elif(timespan == 2):
        timeplotname = "month"
    elif(timespan == 3):
        timeplotname = "year"
    elif(timespan == 4):
        timeplotname = "5year"
    plotname = ticker+timeplotname+".png"
    print(plotname)
    return plotname

def getPlot(ticker, timespan):
    plotfig = getplotname(ticker,timespan)
    beginning = getBeginningDate(timespan)
    yf.download(ticker)
    newtime = yf.download(ticker, start = beginning, end = date.today())
    newtime['Adj Close'].plot()
    plt.xlabel("Date")
    plt.ylabel("Adjusted")
    plt.savefig("images/" + plotfig)
    plt.close()
    return plotfig

@bp.route('/')
def index_route():
    return render_template("StockViewer.html")

@bp.route('/javascriptPost', methods = ['POST'])
def get_post_javascript_data():
    if request.method == 'POST':
        data = request.get_json()
        ticker = data['Company']
        timespan = data['Time']
        print (ticker)
        print (timespan)
    return getPlot(ticker, timespan)

@bp.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@bp.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@bp.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('images', path)

if __name__ == "__main__":
    bp.run(debug=True)
