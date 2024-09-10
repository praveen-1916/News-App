import React, { useState } from 'react'
import Navbar from './Navbar';
import News from './News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default function App() {
  const [progress, setProgress] = useState(0)



  const setTopLoadingBar = (value) => {
    setProgress(value);
  }

  let pageSize = 9;
  return (
    <>
      <Router>
        <LoadingBar color='#f11946' height={3} progress={progress} />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<News progress={setTopLoadingBar} key='general' pageSize={pageSize} category='general' />} />
          <Route exact path='/business' element={<News progress={setTopLoadingBar} key='business' pageSize={pageSize} category='business' />} />
          <Route exact path='/entertainment' element={<News progress={setTopLoadingBar} key='entertainment' pageSize={pageSize} category='entertainment' />} />
          <Route exact path='/health' element={<News progress={setTopLoadingBar} key='health' pageSize={pageSize} category='health' />} />
          <Route exact path='/science' element={<News progress={setTopLoadingBar} key='science' pageSize={pageSize} category='science' />} />
          <Route exact path='/sports' element={<News progress={setTopLoadingBar} key='sports' pageSize={pageSize} category='sports' />} />
          <Route exact path='/technology' element={<News progress={setTopLoadingBar} key='technology' pageSize={pageSize} category='technology' />} />
        </Routes>
      </Router>
    </>

  )
}

