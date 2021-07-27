import axios from 'axios';


export class DipendenteService {

  getUsers(nome, cognome) {
    const url = `http://localhost:8080/api/getuserisinoffice?nome=${nome}&cognome=${cognome}`
    return axios.get(url).then(res => ({
      data: res.data,
    })).catch(res => {
      try {
        return ({
          data: res.response.data.message,
        })
      } catch (error) {
        return ({
          data: JSON.stringify(res.message,null,2)
        })
      }

    })
  }
}
