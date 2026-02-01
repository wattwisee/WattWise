import os
from fastapi.concurrency import asynccontextmanager
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

load_dotenv();

class appliance_info(BaseModel):
    hours: int
    quantity: int
    name: str
    type: str

def initialize_gemini():
    api_key = os.environ.get("Gemini_api_1")
    if not api_key:
        raise ValueError("Gemini api key was not set in .env")
    genai.configure(api_key=api_key)

@asynccontextmanager
async def lifespan(the_app):
    print("startup things")
    initialize_gemini()
    print("Gemini has been initialized")
    yield
    print("shutdown things")

app = FastAPI(lifespan=lifespan)

def call_gemini(info: appliance_info):
    model = genai.GenerativeModel("gemini-2.5-flash") #changeable to other models
    prompt =( f"What is the typical wattage per hour in the Philippines of a "
        f"{info.name}, {info.type}? Please return only the number in watts." 
    )
    response = model.generate_text(prompt=prompt)
    text = response.text.strip()

    try:
        watts = float(''.join(filter(lambda c: c.isdigit() or c == '.', text)))
    except:
        raise ValueError(f"AI returned invalid wattage: {text}")
    return watts

async def energy_calculator(info: appliance_info,watts: float )-> dict:
    if info.name is not None and info.type is not None and info.hours > 0 and info.quantity > 0:
        daily_kwh = (watts * info.hours * info.quantity) / 1000  # kWh
        monthly_kwh = daily_kwh * 30  # Approx 30 days, can make dynamic later
    else:
        raise ValueError("There is a missing or incorrect data to compute the kilo watts per hour")
    return {
    "daily_kwh": daily_kwh,
    "monthly_kwh": monthly_kwh,
    "watts_used": watts
    }

@app.post("/compute_kwh")
async def compute_kwh(info: appliance_info):
    try:
        watts = call_gemini(info)
        
        result = energy_calculator(info, watts)
        return {
            "appliance": info.name,
            "type": info.type,
            "hours": info.hours,
            "quantity": info.quantity,
            **result
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))