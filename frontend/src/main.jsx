import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DynamicTextBoxes from './DynamicTextBoxes.jsx';
import TaskManager from './TaskManager.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  // {
  //   path: "/dt",
  //   element: <DynamicTextBoxes></DynamicTextBoxes>,
  // },
  // {
  //   path: "/tm",
  //   element: <TaskManager></TaskManager>,
  // },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
