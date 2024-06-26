import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=>{
  const [progress, setProgress] = useState(0);
  const pageSize = 6;
  const apikey = process.env.REACT_APP_NEWS_API
  
    return (
      <div>
       <Router>
       <LoadingBar
        color='#f11946'
        progress={progress}
      />
       <NavBar/>
       <Routes>
          <Route exact path="/" element = {<News setProgress = {setProgress} apiKey= {apikey} key = "general" pageSize={pageSize} country="in" category = "general"/>}/>
          <Route exact path="/science" element = {<News setProgress ={setProgress} apiKey= {apikey} key = "science" pageSize={pageSize} country="in" category = "science"/>}/>
          <Route exact path="/business" element = {<News setProgress = {setProgress} apiKey= {apikey} key = "business" pageSize={pageSize} country="in" category = "business"/>}/>
          <Route exact path="/entertainment" element = {<News setProgress = {setProgress} apiKey= {apikey} key = "entertainment" pageSize={pageSize} country="in" category = "entertainment"/>}/>
          <Route exact path="/general" element = {<News setProgress = {setProgress} apiKey= {apikey} key = "general" pageSize={pageSize} country="in" category = "general"/>}/>
          <Route exact path="/health" element = {<News setProgress = {setProgress} apiKey= {apikey} key = "health" pageSize={pageSize} country="in" category = "health"/>}/>
          <Route exact path="/sports" element = {<News setProgress = {setProgress} apiKey= {apikey} key = "sports" pageSize={pageSize} country="in" category = "sports"/>}/>
          <Route exact path="/technology" element = {<News setProgress = {setProgress} apiKey= {apikey} key = "technology" pageSize={pageSize} country="in" category = "technology"/>}/>
        </Routes>
        </Router>
      </div>
    )
  }


export default App

