import axios from 'axios'
import router from '../router/index'



axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'http://39.108.138.143:8082':"http://127.0.0.1:8082";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true //允许跨域携带cookie

// 后端使用了shiro框架就没必要用这些了
// axios.defaults.headers['Access-Control-Allow-Origin'] =  '*'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.response.use(
    res =>{
        console.log("in axios's interceptors~~~~~~~~")
        console.log(res)
        console.log(res.data)
        if (res.data.code === 401)
            router.push("/login")
        return res
    },
    err =>{
        return Promise.reject(err)
    })

function methodGet(url,params) {
    return new Promise((resolve,reject) => {
        axios.get(url,{params})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function methodPost(url,params,headers={}) {
    return new Promise((resolve,reject) => {
        axios.post(url,params,{headers})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}


export default {
    methodGet,
    methodPost,
}
