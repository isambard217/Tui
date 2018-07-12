import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000,
  //headers: { crossDomain: true }
  });

export function addUser() {
  apiClient.post('user')
    .then(function (response) {
      console.log(response.data);
    });
}

export function deleteUser() {

}
