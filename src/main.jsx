// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Esta línea es la correcta
import './index.css';
import { PostsProvider } from "./context/PostsContext";

const root = createRoot(document.getElementById('root'));
root.render(<App />);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <PostsProvider>
        <App />
      </PostsProvider>
    </React.StrictMode>
  );