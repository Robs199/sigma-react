import axios from 'axios';
export class CommentiService{
getComments(page, limit){
    const url=`http://localhost:3000/comments?_page=${page+1}&_limit=${limit}`
return axios.get(url).then(res => ({
    data: res.data,
    totalRecords: res.headers['x-total-count']
  }))
}
createComment(data){
  const url='http://localhost:3000/comments'
  return axios.post(url, data).then(res => ({
    data: res.data
  }))
}
}