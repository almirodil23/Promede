// src/CustomPicker.js  (para web)
import React from 'react';

export default function CustomPicker({ selectedValue, onValueChange, children, style }) {
  return (
    <select
      value={selectedValue}
      onChange={e => onValueChange(e.target.value)}
      style={{
        ...style,
        padding: 8,
        borderRadius: 6,
        borderColor: '#ccc',
        marginBottom: 15,
        fontSize: 16,
      }}
    >
      {React.Children.map(children, child =>
        <option key={child.props.value} value={child.props.value}>
          {child.props.label || child.props.children}
        </option>
      )}
    </select>
  );
}
