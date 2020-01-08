import Axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  console.log(`axiosWithAuth -> token`, token);

  return Axios.create(
    {
      baseURL: 'https://fish-friends-build-week.herokuapp.com/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    }
  );
};