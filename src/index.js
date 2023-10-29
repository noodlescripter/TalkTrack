
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from "./components/modules/speechModules/comps/Home"
import SpeakAi from "./components/modules/speechModules/comps/SpeakAi"
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";


/*Not in used*/
const routers = createBrowserRouter([
    {
        path: "/speaktoai",
        element: <SpeakAi></SpeakAi>
    },
    {
        path: "/speak",
        element: <Home></Home>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <div data-bs-theme="dark">
          <App></App>
          {/*<RouterProvider router={routers}></RouterProvider>*/}
      </div>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
