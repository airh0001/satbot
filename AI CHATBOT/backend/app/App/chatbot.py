from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone as PineconeStore
from .config import settings

emb = OpenAIEmbeddings(openai_api_key=settings.openai_api_key)
vectorstore = PineconeStore(index_name="mosdac-index", embedding=emb)
llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0.0)
qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(search_kwargs={"k": 4}),
)

def answer(query: str, user_id: str):
    return qa.run({"query": query, "user_id": user_id})