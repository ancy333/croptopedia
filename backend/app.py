
from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import joblib
import pyrebase
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import random

# Initialize Flask application
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Firebase configuration
config = {
    "apiKey": "AIzaSyAophsoUB61f8Aiawrf_4mT2BLGnhSHcNY",
    "authDomain": "testcrop2.firebaseapp.com",
    "projectId": "testcrop2",
    "databaseURL": "https://testcrop2-default-rtdb.firebaseio.com",
    "storageBucket": "testcrop2.appspot.com",
    "messagingSenderId": "937974234875",
    "appId": "1:937974234875:web:c5735a44abbf52ed71fa5e"
  }

# Initialize Firebase
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()

# Define paths
local_path = 'Crop_recommendation.csv'
path_on_cloud = 'files/Crop_recommendation.csv'

# Function to download and load dataset from Firebase
def download_and_load_data():
    firebase.storage().child(path_on_cloud).download('', local_path)
    return pd.read_csv(local_path)

# Retrain the model
def retrain_model():
    try:
        df = download_and_load_data()

        x = df.drop('label', axis=1)
        y = df['label']

        x_train, x_test, y_train, y_test = train_test_split(x, y, stratify=y, random_state=1)

        model = RandomForestClassifier(n_estimators=25, random_state=2)
        model.fit(x_train.values, y_train.values)
        
        y_pred = model.predict(x_test)
        accuracy = accuracy_score(y_test, y_pred)
        print("Accuracy of Random Forest is " + str(accuracy))

        joblib.dump(model, 'crop_model.pkl')
    except Exception as e:
        print(f"Error retraining model: {str(e)}")

# Retrain model on startup
retrain_model()

@app.route('/', methods=['GET'])
def get_data():
    return jsonify({"message": "API is Running"})

# Load the model for predictions
def load_model():
    return joblib.load('crop_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        model = load_model()
        query_df = pd.DataFrame([data])
        prediction = model.predict(query_df)
        return jsonify({'Prediction': list(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})

# Define color array for plots
colorarr = ['#0592D0','#Cd7f32', '#E97451', '#Bdb76b', '#954535', '#C2b280', '#808000','#C2b280', '#E4d008', '#9acd32', '#Eedc82', '#E4d96f',
            '#32cd32','#39ff14','#00ff7f', '#008080', '#36454f', '#F88379', '#Ff4500', '#Ffb347', '#A94064', '#E75480', '#Ffb6c1', '#E5e4e2',
            '#Faf0e6', '#8c92ac', '#Dbd7d2','#A7a6ba', '#B38b6d']

# Generate plots
def generate_plot(data, nutrient, colorarr):
    fig = make_subplots(rows=1, cols=2)

    top = {
        'y': data[nutrient][0:10].sort_values().index,
        'x': data[nutrient][0:10].sort_values()
    }

    last = {
        'y': data[nutrient][-10:].index,
        'x': data[nutrient][-10:]
    }

    fig.add_trace(
        go.Bar(
            y=top['y'],
            x=top['x'],
            name=f"Most {nutrient} required",
            marker_color=random.choice(colorarr),
            orientation='h',
            text=top['x']
        ),
        row=1, col=1
    )

    fig.add_trace(
        go.Bar(
            y=last['y'],
            x=last['x'],
            name=f"Least {nutrient} required",
            marker_color=random.choice(colorarr),
            orientation='h',
            text=last['x']
        ),
        row=1, col=2
    )

    fig.update_traces(texttemplate='%{text}', textposition='inside')
    fig.update_layout(
        title_text=f"{nutrient} Requirement",
        plot_bgcolor='white',
        font_size=12, 
        font_color='black',
        height=500
    )

    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(showgrid=False)
    
    return fig

@app.route('/plot/nitrogen', methods=['GET'])
def plot_nitrogen():
    df = pd.read_csv(local_path)
    crop_summary = pd.pivot_table(df, index=['label'], aggfunc='mean')
    crop_summary_N = crop_summary.sort_values(by='N', ascending=False)
    fig = generate_plot(crop_summary_N, 'N', colorarr)
    return jsonify(fig.to_json())

@app.route('/plot/phosphorus', methods=['GET'])
def plot_phosphorus():
    df = pd.read_csv(local_path)
    crop_summary = pd.pivot_table(df, index=['label'], aggfunc='mean')
    crop_summary_P = crop_summary.sort_values(by='P', ascending=False)
    fig = generate_plot(crop_summary_P, 'P', colorarr)
    return jsonify(fig.to_json())

@app.route('/plot/potassium', methods=['GET'])
def plot_potassium():
    df = pd.read_csv(local_path)
    crop_summary = pd.pivot_table(df, index=['label'], aggfunc='mean')
    crop_summary_K = crop_summary.sort_values(by='K', ascending=False)
    fig = generate_plot(crop_summary_K, 'K', colorarr)
    return jsonify(fig.to_json())

@app.route('/plot/npk', methods=['GET'])
def plot_npk():
    df = pd.read_csv(local_path)
    crop_summary = pd.pivot_table(df, index=['label'], aggfunc='mean')
    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=crop_summary.index,
        y=crop_summary['N'],
        name='Nitrogen',
        marker_color='indianred'
    ))
    fig.add_trace(go.Bar(
        x=crop_summary.index,
        y=crop_summary['P'],
        name='Phosphorous',
        marker_color='lightsalmon'
    ))
    fig.add_trace(go.Bar(
        x=crop_summary.index,
        y=crop_summary['K'],
        name='Potash',
        marker_color='crimson'
    ))

    fig.update_layout(
        title="N, P, K values comparison between crops",
        plot_bgcolor='white',
        barmode='group',
        xaxis_tickangle=-45
    )
    
    return jsonify(fig.to_json())

if __name__ == '__main__':
    app.run(debug=True)


