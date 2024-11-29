import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import AOS from "aos";
import "aos/dist/aos.css"; 
AOS.init();

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer autoClose={1500} />
  </QueryClientProvider>
);

