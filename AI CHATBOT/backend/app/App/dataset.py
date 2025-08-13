from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Dataset(Base):
    __tablename__ = "datasets"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    timestamp = Column(String)
    sensor = Column(String)
    region = Column(String)
    download_url = Column(String)
    image_url = Column(String, nullable=True)
    download_count = Column(Integer, default=0)
