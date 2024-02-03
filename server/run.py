from project import app
from mangum import Mangum
import uvicorn

#handler = Mangum(app)

if __name__ == "__main__":
    uvicorn.run(app, port=8000)