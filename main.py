from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="Car Price Prediction API")

# Load trained model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

# If you used a scaler during training, uncomment this
# with open("scaler.pkl", "rb") as f:
#     scaler = pickle.load(f)


class CarData(BaseModel):
    symboling: float
    wheelbase: float
    carlength: float
    carwidth: float
    enginesize: float
    boreratio: float
    horsepower: float
    peakrpm: float
    citympg: float
    highwaympg: float


@app.get("/")
def home():
    return FileResponse("static/index.html")


@app.post("/predict")
def predict(data: CarData):

    features = np.array([[
        data.symboling,
        data.wheelbase,
        data.carlength,
        data.carwidth,
        data.enginesize,
        data.boreratio,
        data.horsepower,
        data.peakrpm,
        data.citympg,
        data.highwaympg
    ]])

    # If scaler was used during training:
    # features = scaler.transform(features)

    prediction = model.predict(features)

    return {
        "predicted_price": round(float(prediction[0]), 2)
    }