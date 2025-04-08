// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Esta línea es la correcta
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
