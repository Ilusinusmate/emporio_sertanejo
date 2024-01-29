from server.project import app
from uvicorn import run

if __name__ == "__main__":
    run(app, port=8000)