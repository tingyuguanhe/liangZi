import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { Message } from 'element-ui'

let api = axios.create({
    baseURL:'',
    timeout: 5000,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
})


export let fetch = (method,url,data) => {
    return new Promise((resolve,reject) => {
        axios({
            method: method,
            url:url,
            ...data
        }).then(response => {
            
            resolve(response.data)
            
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    })
}