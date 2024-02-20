import React, { useState, useEffect } from 'react';
import './HashTable.css'; // Arquivo de estilos

function HashTable() {
  const [data, setData] = useState({});
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const newPositions = [];
    const usedPositions = new Set(); // Usado para garantir que as posições iniciais sejam exclusivas
    Object.keys(data).forEach(() => {
      let x, y;
      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
      } while (isTooClose(x, y, usedPositions));
      usedPositions.add(`${x},${y}`);
      newPositions.push({ x, y });
    });
    setPositions(newPositions);
  }, [data]);

  const isTooClose = (x, y, usedPositions) => {
    for (const position of usedPositions) {
      const [posX, posY] = position.split(',').map(parseFloat);
      const distance = Math.sqrt((x - posX) ** 2 + (y - posY) ** 2);
      if (distance < 20) return true; // Ajuste a distância conforme necessário para evitar sobreposição
    }
    return false;
  };

  const insert = () => {
    if (key.trim() === '' || value.trim() === '') return;
    const newData = { ...data };
    newData[key] = value;
    setData(newData);
    setKey('');
    setValue('');
  };

  const remove = (keyToRemove) => {
    const newData = { ...data };
    delete newData[keyToRemove];
    setData(newData);
  };

  const searchAndRemove = () => {
    if (searchKey.trim() === '') return;
    if (!data[searchKey]) {
      alert('Key not found');
      return;
    }
    remove(searchKey);
    setSearchKey('');
  };

  const renderLines = () => {
    if (Object.keys(data).length <= 1) return null; // Caso especial quando não há elementos ou apenas um elemento
    const lines = [];
    for (let i = 0; i < positions.length - 1; i++) {
      lines.push(
        <line
          key={i}
          x1={positions[i].x}
          y1={positions[i].y}
          x2={positions[i + 1].x}
          y2={positions[i + 1].y}
          style={{ stroke: "black", strokeWidth: 2 }}
        />
      );
    }
    return lines;
  };

  return (
    <div className="hash-table">
      <h2 className="hash-table-title">Hash Table</h2>
      <div className="hash-table-inputs">
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="hash-table-button" onClick={insert}>
          Insert
        </button>
      </div>
      <div className="hash-table-search">
        <input
          type="text"
          placeholder="Search Key"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="hash-table-button" onClick={searchAndRemove}>
          Search & Remove
        </button>
      </div>
      <div className="hash-table-content">
        {Object.keys(data).map((key, index) => (
          <div className="hash-table-item" key={index}>
            <span>{data[key]}</span>
            <button onClick={() => remove(key)}>Remove</button>
          </div>
        ))}
      </div>
      <svg width="100" height="100">
        {Object.keys(data).map((key, index) => (
          <React.Fragment key={index}>
            <circle
              cx={positions[index]?.x || 50}
              cy={positions[index]?.y || 50}
              r="10"
              stroke="black"
              strokeWidth="2"
              fill="white"
            />
            <text
              x={positions[index]?.x || 50}
              y={positions[index]?.y || 50}
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {data[key]}
            </text>
          </React.Fragment>
        ))}
        {renderLines()}
      </svg>
    </div>
  );
}

export default HashTable;
