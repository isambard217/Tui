import axios from 'axios';
import _ from 'lodash';
import { User } from '../domain';
import getServerBaseUrl from './ApiBaseUrl';

const SERVER_BASE_URL = getServerBaseUrl();

export default function login({ userName, password }) {
  return new Promise((resolve, reject) => {
    if (userName === undefined) {
      return reject('userName should be defined');
    }
    if (_.trim(userName) === '') {
      return reject('userName should not be an empty string');
    }
    if (password === undefined) {
      return reject('password should not be null');
    }
    if (_.trim(password) === '') {
      return reject('password should not be empty string');
    }
    return axios.post(`${SERVER_BASE_URL}/v2/api/login`,
      new User(userName, password))
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}
