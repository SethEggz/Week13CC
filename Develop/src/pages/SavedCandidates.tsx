import { removeCandidate } from "../api/API";
import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';

const SavedCandidates = () => {
  const [userData, setUserData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchGithubUser('exampleUsername'); // Replace 'exampleUsername' with a valid username
      setUserData(data);
    };
    fetchData();
  }, []);
  
  return (
    <>
      <h1>Potential Candidates</h1>
      <ul>
        <li>{userData ? userData : 'Loading...'}<button onClick={() => removeCandidate(1)}> - </button></li>
        
      </ul>
    </>
  );
};

export default SavedCandidates;
