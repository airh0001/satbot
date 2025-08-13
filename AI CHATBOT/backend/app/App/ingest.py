import json
from App.dataset import Dataset

def ingest_catalog(db_session, catalog_file='data/catalog.json'):
    with open(catalog_file) as f:
        data = json.load(f)
    for item in data:
        dataset = Dataset(
            title=item['title'],
            timestamp=item['timestamp'],
            sensor=item['sensor'],
            region=item['region'],
            download_url=item['download_url'],
            image_url=item.get('image_url'),
            download_count=0
        )
        db_session.add(dataset)
    db_session.commit()
def ingest_sample_data(db_session):
    sample_data = [
        {
            "title": "Sample Dataset 1",
            "timestamp": "2023-10-01T00:00:00Z",
            "sensor": "Sensor A",
            "region": "Region X",
            "download_url": "http://example.com/sample1.zip",
            "image_url": "http://example.com/sample1.jpg"
        },
        {
            "title": "Sample Dataset 2",
            "timestamp": "2023-10-02T00:00:00Z",
            "sensor": "Sensor B",
            "region": "Region Y",
            "download_url": "http://example.com/sample2.zip",
            "image_url": None
        }
    ]
    for item in sample_data:
        dataset = Dataset(
            title=item['title'],
            timestamp=item['timestamp'],
            sensor=item['sensor'],
            region=item['region'],
            download_url=item['download_url'],
            image_url=item.get('image_url'),
            download_count=0
        )
        db_session.add(dataset)
    db_session.commit()