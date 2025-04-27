
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure React is correctly initialized before rendering
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);
root.render(<App />);
