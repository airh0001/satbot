import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ExplorePage({ token }) {
  const [datasets, setDatasets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sensor, setSensor] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/datasets', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setDatasets(data);
        setFiltered(data);
      });
  }, [token]);

  useEffect(() => {
    let result = datasets;
    if (sensor) {
      result = result.filter(d => d.sensor === sensor);
    }
    if (startDate && endDate) {
      result = result.filter(d => {
        const date = new Date(d.timestamp);
        return date >= startDate && date <= endDate;
      });
    }
    setFiltered(result);
  }, [sensor, startDate, endDate, datasets]);

  const exportCSV = () => {
    const headers = ['Title,Timestamp,Sensor,Region,Download URL'];
    const rows = filtered.map(d =>
      `${d.title},${new Date(d.timestamp).toLocaleString()},${d.sensor},${d.region},${d.download_url}`
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'datasets.csv';
    link.click();
  };

  const sensors = [...new Set(datasets.map(d => d.sensor))];

  return (
    <div className="container">
      <h2>Available Satellite Datasets</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <select value={sensor} onChange={e => setSensor(e.target.value)}>
          <option value="">All Sensors</option>
          {sensors.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
        <DatePicker selected={startDate} onChange={setStartDate} placeholderText="Start Date" />
        <DatePicker selected={endDate} onChange={setEndDate} placeholderText="End Date" />
        <button onClick={exportCSV}>Export CSV</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Date</th>
              <th>Sensor</th>
              <th>Region</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={i}>
                <td><img src={d.image_url} alt="preview" width="80" /></td>
                <td>{d.title}</td>
                <td>{new Date(d.timestamp).toLocaleString()}</td>
                <td>{d.sensor}</td>
                <td>{d.region}</td>
                <td><a href={d.download_url} target="_blank" rel="noreferrer">Download</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

