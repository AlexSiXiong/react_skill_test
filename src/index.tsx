import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {familyDictTree, topPeopleIds } from './data-processor'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App personIds={topPeopleIds} family_dict={familyDictTree}/>
  </React.StrictMode>
);
