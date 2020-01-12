import Axios from 'axios';

import { apiSwitcher } from './apiSwitcher';
const API = apiSwitcher();

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  console.log(`axiosWithAuth -> token`, token);

  return Axios.create(
    {
      baseURL: API+'/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    }
  );
};