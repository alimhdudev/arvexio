import React, { useState, useEffect } from 'react';
import parseSrt from 'parse-srt';
import TranscriptionItem from './TranscriptionItem';

export default function TranscriptionEditor({ srt, setSrt }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const parsedItems = parseSrt(srt);
    setItems(parsedItems);
  }, [srt]);

  return (
    <div>
      {items.map((item, index) => (
        <TranscriptionItem
          key={index}
          id={index + 1}
          start={item.start}
          end={item.end}
          text={item.text}
          setSrt={setSrt}
        />
      ))}
    </div>
  );
}