from flask import Flask, render_template ,request
import json
import time

app = Flask(__name__)
#port = int(os.getenv('VCAP_APP_PORT', 5000))




@app.route('/')
def index():
    return render_template('test3.html')


@app.route('/jsonDatatree')
def jsonDatatree():
    return json.dumps(json.load(open('jsonDatatree.json')))


@app.route('/dataframe')
def getDataframe():
    dataset=json.load(open('dataset.json'))
    s_ID=request.args.get('id')
    return json.dumps(dataset[s_ID])

if __name__ == '__main__':
    app.run()