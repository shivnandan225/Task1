from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="Car Price Prediction")

# Load trained model
with open("car_price_model.pkl", "rb") as file:
    model = pickle.load(file)

# Static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")


class CarData(BaseModel):
    symboling: float
    wheelbase: float
    carlength: float
    carwidth: float
    carheight: float
    curbweight: float
    enginesize: float
    boreratio: float
    horsepower: float
    peakrpm: float
    citympg: float
    highwaympg: float


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request}
    )


@app.post("/predict")
async def predict(data: CarData):

    input_data = np.array([[
        data.symboling,
        data.wheelbase,
        data.carlength,
        data.carwidth,
        data.carheight,
        data.curbweight,
        data.enginesize,
        data.boreratio,
        data.horsepower,
        data.peakrpm,
        data.citympg,
        data.highwaympg
    ]])

    prediction = model.predict(input_data)

    return {
        "prediction": float(prediction[0])
    }