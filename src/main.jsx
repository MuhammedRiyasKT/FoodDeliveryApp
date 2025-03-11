import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreContextProvider from './context/StoreContext.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min';


createRoot(document.getElementById('root')).render(
  
  <StoreContextProvider>
    <StrictMode>
    <App />
  </StrictMode>
  </StoreContextProvider>
  
)
