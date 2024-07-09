import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import random
import plotly.express as px
from plotly.subplots import make_subplots

df = pd.read_csv('Crop_recommendation.csv')
df.head()
df.info()

df.isnull().sum()

x = df.drop('label', axis = 1)
y = df['label']







from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x,y, stratify = y, random_state = 1)


from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
model_4 = RandomForestClassifier(n_estimators = 25, random_state=2)
model_4.fit(x_train.values, y_train.values)
y_pred_4 = model_4.predict(x_test)
random_fore_acc = accuracy_score(y_test, y_pred_4)
print("Accuracy of Random Forest is " + str(random_fore_acc))


# import pickle

# Pkl_Filename = "Pickle_RL_Model.pkl"  

# with open(Pkl_Filename, 'wb') as file:  
#     pickle.dump(model_4, file)

import joblib 
file_name = 'crop_app'

joblib.dump(model_4,'crop_app')

app = joblib.load('crop_app')

arr = [[90,42,43,20.879744,82.002744,6.502985,202.935536]]
acc = app.predict(arr)
acc


