import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/'
});

export function AddProjectBase() {
  apiClient.post('projectBase')
    .then(function (response) {
      console.log(response.data);
    });
}

