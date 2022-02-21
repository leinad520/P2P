import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Overview from './components/OverviewComponents/Overview.jsx'
import ProductHeader from './components/OverviewComponents/ProductHeader.jsx'
import ProductState from './components/Context/ProductState.jsx';
import { useNavigate } from 'react-router';
import { useParams, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<ProductState><App /></ProductState>}/>
      <Route path=':id' element={<ProductState><App /></ProductState>}/>
    </Routes>
  </Router>
  ,
  document.getElementById('app'));
