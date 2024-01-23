from project import app
from uvicorn import run 
from mangum import Mangum

handler = Mangum(app)

if __name__ == "__main__":
    run(app, port=8000)