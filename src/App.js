import React from 'react';
import { Button, DatePicker, version } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <div className="App">
    <h1>antd version: {version}</h1>
    <DatePicker />
    <Button type="primary" style={{ marginLeft: 8 }}>
      Primary Button
    </Button>
  </div>
  );
}

export default App;
