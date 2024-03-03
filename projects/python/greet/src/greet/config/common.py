from pydantic import BaseModel






class CommonConfiguration(BaseModel):
    who_am_i: str = "123"
