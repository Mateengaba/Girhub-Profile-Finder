import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink, Navigate } from 'react-router-dom'; // NavLink ko import karen
import './Home.css';

const Home = () => {
  const [data, setData] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [repo, setRepo] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

 
 //1st github
  const gitapi = async (Name) => {
    try {
      const data = await axios.get(`https://api.github.com/users/${Name}`);
      setData(data.data);
      setSelectedUser(Name); // Istemal karne wale user ko set karen
      console.log(data.data, "data")
    } catch (error) {
      console.log(error, 'error');
      setSelectedUser('notfound'); // Agar user nahi milta to 'notfound' user set karen
    }
  };

  useEffect(() => {
    gitapi('Mateengaba'); // by defolt name
  }, []);

  
  
  //2nd userRepo kalia
  const userRepo = async (username) => {
    try {
      const repodata = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepo(repodata.data);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    if (selectedUser !== 'notfound') {     // notfound ka lia condition
      userRepo(selectedUser);
    }
  }, [selectedUser]);


// handleSearch ka li function.
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      gitapi(searchInput);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="container">
          <div className="search-form">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="GitHub Profile Search..."
            />
            <button>Search</button>
          </div>

          {selectedUser === 'notfound' ? (
            // Agar user nahi milta to "User Not Found" message aur NavLink dikhayen
            <div className="not-found-message">
              <NavLink to="/notfound"></NavLink>
            </div>
          ) : (
            // User ki maloomat aur repositories jaise pehle dikhayen
            
            
            <div className="card">
              <div className="avatar">
                <img src={data.avatar_url} alt="" />
              </div>
            
              <div className="info">
                <h2>{data.name}</h2>
                <p>{data.login}</p>
                <div className="follow-info">
                 
                  <div className="single">
                    <span> {data.followers} </span>
                    <span>Followers</span>
                  </div>
                
                  <div className="single">
                    <span> {data.following} </span>
                    <span>Following</span>
                  </div>
                </div>
              
                <div className="single">
                  <span> {data.public_repos} </span>
                  <span>Public-Repos</span>
                </div>
                <hr />
               
                <div className="single">
                  <span> {data.bio} </span>
                </div>
              </div>
            </div>
          )}
         
          <div className="repos">
            {selectedUser !== 'notfound' &&
              repo.map((repository) => (     // map ka function
                <a
                  href={repository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card"
                  key={repository.id}
                >
                  <span>{repository.name}</span>
                  <h2>Repo Name</h2>
                </a>
              ))}
          </div>
        </div>
      </form>

      {/* Agar selectedUser 'notfound' hai to /notfound pe Redirect karen */}
      {selectedUser === 'notfound' && <Navigate to="/notfound" />}
    </>
  );
};

export default Home;
