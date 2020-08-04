import React, { useState } from 'react';

interface SortProps {
  sortBy: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sort: React.FC<SortProps> = props => {
  const { onChange } = props;
  const [sortBy, setSortBy] = useState('score');

  const handleChange = e => {
    setSortBy(e.target.value);
    onChange(e);
  };

  return (
    <select value={sortBy} onChange={handleChange}>
      <option value="overall">Score</option>
      <option value="coffee">Coffee</option>
      <option value="aesthetic">Aesthetic</option>
      <option value="seating">Seating</option>
    </select>
  );
};

export default Sort;
