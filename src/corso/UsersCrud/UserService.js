import axios from 'axios';


export class UserService {

  getUsers(page, limit)  {
    const url = `http://localhost:3000/users?_page=${page+1}&_limit=${limit}`
    return axios.get(url).then(res => ({
      data: res.data,
      totalRecords: res.headers['x-total-count']
    }))
  }

  createUser(data) {
    const url = 'http://localhost:3000/users'
    return axios.post(url, data).then(res => ({
      data: res.data
    }))
  }

 removeId(id){
    const url = `http://localhost:3000/users/${id}`
    axios.delete(url).then(res => ({
      data: res.data
    }))
  }

  removeMultipleId(url){
   //   const url = `http://localhost:3000/users/${users.id}`
    axios.delete(url).then(res => ({
      data: res.data
    }))
  }

  updateUser(user){
    const url = `http://localhost:3000/users/${user.id}`
    return axios.put(url, user).then(res => ({
      data: res.data
    }))
  }

/********************************************************* */
  getComments(page, limit)  {
    const url = `http://localhost:3000/comments?_page=${page+1}&_limit=${limit}`
    return axios.get(url).then(res => ({
      data: res.data,
      totalRecords: res.headers['x-total-count']
    }))
  }


  getPost(id){
    const url =`http://localhost:3000/users/${id}/posts`
    return axios.get(url).then(res => ({
        data: res.data,
        totalRecords: res.headers['x-total-count']
      }))
}

}

