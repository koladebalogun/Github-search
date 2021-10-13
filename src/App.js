import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';

import moon from './Images/moon.svg';
import sun from './Images/sun.svg';
import location from './Images/location.svg';
import website from './Images/websiteicon.svg';
import twitter from './Images/twittericon.svg';
import company from './Images/companyicon.svg';

import{ ThemeProvider } from 'styled-components';
import { GlobalStyles } from "./GlobalStyles";
import { lightTheme, darkTheme } from "./theme"


function App() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState('');

  const [theme, setTheme] = useState('dark');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect(()=>{
    axios.get('https://api.github.com/users/example')
    .then(res=>{
      console.log(res.data)
      setData(res.data)
    })
    .catch(err=>{
      console.log(err.data)
    })

  },[]);

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  };

  const handleSubmit = () =>  {
    axios.get(`https://api.github.com/users/${userInput}`)
    .then(res=>{
      setData(res.data)
    });
  };

  const icon = theme==='light'? <img src={moon} alt=''/> : <img src={sun} alt=''/>


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <div className="maincontainer">
        {[data].map((user)=>(
          <div className="container" key={user.id}>

            <div className="toggle-switch">
              <label className='switch'>
                <input type="checkbox" />
                <span 
                onClick={themeToggler}
                className='slider'/>
              </label>
            </div>

            <div className="logo">
              <h2>devfinder</h2>
            </div>
            <div className="search-logo">
            </div>
            <div className="search">
              <input 
              type="text"
              name='Github user'
              placeholder='            Search Github username...'
              onChange={handleSearch}
              />
              <button 
              onClick={handleSubmit}
              >Search
              </button>
            </div>

            <div className="card">
              <div className="card-info">
                <div className="card-image">
                  <img src={user.avatar_url} alt="" />
                </div>
                
                <div className="card-user">
                  <div className="card-user-info">
                    <h2>{user.name}</h2>
                    <a href='/'>@{user.login}</a>
                    <p>{user.data ? user.bio : 'This profile has no bio'}</p>
                  </div>
                  <div className="card-joined-date">
                    <p>joined {user.created_at}</p>
                  </div>
                </div>
              </div>
              <div className="follower-card">
                <div className="follower-info">
                  <div className="repos">
                    <p>Repos</p>
                    <h3>{user.repos}</h3>
                  </div>
                  <div className="following">
                    <p>Following</p>
                  <h3>{user.following}</h3>
                  </div>
                  <div className="followers">
                    <p>Followers</p>
                  <h3>{user.followers}</h3>
                  </div> 
                </div> 
              </div>

              <div className="user-info">
                <div className="user-details">
                  <p><img className='icon' src={location} alt="" />{user.data ? user.location : 'Not Available'}</p>
                  <p><img src={website} alt="" />{user.data ? user.url : 'Not Available'}</p>
                </div> 
                <div className="user-socials">
                  <p><img src={twitter} alt="" />{user.data ? user.twitter_username : 'Not Available'}</p>
                  <p><img src={company} alt="" />{user.data ? user.organizations_url : 'Not Available'}</p>
                </div> 
              </div>
              
            </div>
            <div className="icn">{icon}</div>
          </div>
        ))}
      </div>
      

    </ThemeProvider>

  );
}

export default App;
