import { createRoot } from 'react-dom/client'
import './utils/polyfills' // Ensure polyfills are loaded before the app starts
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
