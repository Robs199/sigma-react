import axios from 'axios';
  
export const fetchPost = async (id) => {
    const res = await fetch(`http://localhost:3000/posts/${id}`
    )
}
export class ServicePost{
    getPost(id){
        const url =`http://localhost:3000/users/${id}/posts`
        return axios.get(url).then(res => ({
            data: res.data,
            totalRecords: res.headers['x-total-count']
          }))
    }
}