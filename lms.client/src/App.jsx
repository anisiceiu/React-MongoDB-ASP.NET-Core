import { useEffect, useState } from 'react';
import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
   return ( <>
        <AppRouter />
        <ToastContainer position="bottom-right" />
    </>)
}

export default App;