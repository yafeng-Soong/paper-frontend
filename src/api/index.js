import axios from 'axios'
import router from '../router/index'
import Vue from 'vue'



axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'http://39.108.138.143:8082':"http://39.108.138.143:8082";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true //允许跨域携带cookie

// 后端使用了shiro框架就没必要用这些了
// axios.defaults.headers['Access-Control-Allow-Origin'] =  '*'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.response.use(
    res =>{
        if (res.data.code === 401)
            router.replace("/login")
        return res
    },
    err =>{
        // 网络错误统一在此处理
        if (err.response && err.response.status === 401) {
          Vue.prototype.$toast.error("您没有相应的权限")
        //   router.go(-1)
        }else {
          Vue.prototype.$toast.error("~~网络出小差了~~")
        }
        return Promise.reject(err)
    })

export function methodGet(url,params) {
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

export function methodPost(url,params,headers={}) {
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
