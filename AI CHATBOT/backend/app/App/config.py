from pydantic import BaseSettings, Field

class Settings(BaseSettings):
    db_url: str = Field(..., env="DATABASE_URL")
    object_store_url: str = Field(..., env="MINIO_ENDPOINT")
    vector_store: str = "pinecone"  # or "faiss"
    openai_api_key: str | None = None
    class Config:
        env_file = ".env"
settings = Settings()