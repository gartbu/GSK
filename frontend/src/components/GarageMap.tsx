import React, { useEffect, useState } from 'react';

interface Garage {
  id: number;
  number: string;
  owner_name?: string;
  status: 'paid' | 'partial' | 'unpaid';
}

const GarageMap: React.FC = () => {
  const [garages, setGarages] = useState<Garage[]>([]);

  useEffect(() => {
    fetch('/api/garages')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => setGarages(data))
      .catch(err => console.error('Ошибка загрузки гаражей:', err));
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'paid': return '#4CAF50';    // зелёный
      case 'partial': return '#FFC107'; // жёлтый
      case 'unpaid': return '#F44336';  // красный
      default: return '#9E9E9E';
    }
  };

  const cols = 5;
  const cellWidth = 80;
  const cellHeight = 60;
  const spacing = 10;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Карта гаражей</h2>
      {garages.length === 0 ? (
        <p>Загрузка...</p>
      ) : (
        <svg
          width={cols * (cellWidth + spacing) + spacing}
          height={(Math.ceil(garages.length / cols)) * (cellHeight + spacing) + spacing}
          style={{ border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}
        >
          {garages.map((garage, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const x = spacing + col * (cellWidth + spacing);
            const y = spacing + row * (cellHeight + spacing);

            return (
              <g key={garage.id}>
                <rect
                  x={x}
                  y={y}
                  width={cellWidth}
                  height={cellHeight}
                  fill={getStatusColor(garage.status)}
                  stroke="#333"
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x={x + cellWidth / 2}
                  y={y + cellHeight / 2 - 5}
                  textAnchor="middle"
                  fill="#000"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {garage.number}
                </text>
                {garage.owner_name && (
                  <text
                    x={x + cellWidth / 2}
                    y={y + cellHeight / 2 + 12}
                    textAnchor="middle"
                    fill="#000"
                    fontSize="10"
                  >
                    {garage.owner_name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
};

export default GarageMap;
