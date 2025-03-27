import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, saveCandidate } from '../api/API';


const CandidateSearch = () => {
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
      <h1>CandidateSearch</h1>
      <div className='card'>{userData ? userData : 'Loading...'}</div>
      <button onClick={searchGithub} className='minusButton'> - </button>
      <button
        onClick={() => saveCandidate({ id: 1, name: 'John Doe', email: 'john.doe@example.com', company:'comapany', bio:'bio' })}
        className='plusButton'
      >
        +
      </button>
    </>
  );
};

export default CandidateSearch;
