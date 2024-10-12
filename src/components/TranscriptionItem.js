import React, { useState, useEffect } from 'react';

export default function TranscriptionItem({ id, start, end, text, setSrt }) {
  console.log(text, 'text');
  const [localText, setLocalText] = useState(text);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const handleBlur = () => {
    setSrt(prevSrt => {
      const srtLines = prevSrt.split('\n\n');
      const updatedLines = srtLines.map(line => {
        const [index, time, ...content] = line.split('\n');
        if (parseInt(index) === id) {
          return `${index}\n${time}\n${localText}`;
        }
        return line;
      });
      return updatedLines.join('\n\n');
    });
  };

  const handleChange = (e) => {
    setLocalText(e.target.value);
  };

  return (
    <div style={{width: '100%', height: '100%',}}>
      <input 
        style={{
          width: '100%', 
          backgroundColor: 'white',
          color: '#000000',
          borderRadius: '10px', 
          padding: 10,
          marginBottom: 7,
        }} 
        value={localText} 
        onBlur={handleBlur} 
        onChange={handleChange} />
    </div>
  );
}