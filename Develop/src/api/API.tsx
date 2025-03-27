const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    // console.log(import.meta.env);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    // console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    // console.log('Data:', data);
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

const saveCandidate = async (candidate: Candidate) => {

  try {
    // Retrieve existing candidates from local storage
    const existingCandidates = JSON.parse(
      localStorage.getItem('potentialCandidates') || '[]'
    );

    // Check if candidate is already saved to prevent duplicates
    const isDuplicate = existingCandidates.some(
      (existingCandidate: Candidate) => existingCandidate.id === candidate.id
    );

    if (isDuplicate) {
      console.log('Candidate already saved');
      return false;
    }

    // Add new candidate to the list
    const updatedCandidates = [...existingCandidates, candidate];

    // Save updated list back to local storage
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));

    return true;
  } catch (err) {
    console.error('Error saving candidate to local storage:', err);
    return false;
  }
}
const removeCandidate = (Username: number): boolean => {
  try {
    const existingCandidates = JSON.parse(
      localStorage.getItem('potentialCandidates') || '[]'
    );

    const updatedCandidates = existingCandidates.filter(
      (candidate: Candidate) => candidate.id !== Username
    );

    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));

    return true;
  } catch (err) {
    console.error('Error removing candidate from local storage:', err);
    return false;
  }
}
export { searchGithub, searchGithubUser, saveCandidate, removeCandidate };
