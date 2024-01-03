from pydantic import BaseModel
from typing import Optional


class ValidationProduct(BaseModel):
    id : str
    name : str
    price : float
    barcode : str
    description : str