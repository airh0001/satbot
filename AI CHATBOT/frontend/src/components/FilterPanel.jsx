import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function FilterPanel({
  sensors = [],
  regions = [],
  selectedSensor,
  selectedRegion,
  startDate,
  endDate,
  onSensorChange,
  onRegionChange,
  onStartDateChange,
  onEndDateChange,
}) {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
      <select value={selectedSensor} onChange={e => onSensorChange(e.target.value)}>
        <option value="">All Sensors</option>
        {sensors.map((sensor, idx) => (
          <option key={idx} value={sensor}>
            {sensor}
          </option>
        ))}
      </select>

      <select value={selectedRegion} onChange={e => onRegionChange(e.target.value)}>
        <option value="">All Regions</option>
        {regions.map((region, idx) => (
          <option key={idx} value={region}>
            {region}
          </option>
        ))}
      </select>

      <DatePicker
        selected={startDate}
        onChange={onStartDateChange}
        placeholderText="Start Date"
        isClearable
      />

      <DatePicker
        selected={endDate}
        onChange={onEndDateChange}
        placeholderText="End Date"
        isClearable
      />
    </div>
  );
}
