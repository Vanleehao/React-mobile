const axios = require('axios')
const qs = require('qs')

import check from './common'
var g_baseUrl = null

const _CONFIG = {}

const buildConfig = (method,url,urlPath,data,query=null)=>{

    let config = {
        method,
        url:urlPath,
        baseURL: url,
        responseType: 'json'
    }
    if(data){
        data = Object.assign({},data)
    }
    let params = {}
    let headers = {accept: 'application/json'}

    if(data.token && data.userId){
        headers.token = data.token
        headers.userId = data.userId
        delete data.token
        delete data.userId
    }
    
    if (method.toLocaleLowerCase() === 'get'){
        params = data
        data = null
    } 

    if(query){
        params = Object.assign({},params,query)
    }

    let CONFIG = global._CONFIG || _CONFIG
    headers.p = CONFIG.p || 1
    headers.a = data && data.a || params && params.a || 1
    data && data.a && delete data.a
    params && params.a && delete params.a
    headers.v = CONFIG.v || '0.0.0'
    headers.t = Date.now()
    let cp = {p:headers.p,a:headers.a,v:headers.v,t:headers.t}
    if(headers.token){
        cp.token = headers.token
    }
    if(headers.userId){
        cp.userId = headers.userId
    }
    for(let k in params){
        if(params[k] != undefined){
            cp[k] = params[k]
        }
    }
    if(data){
        for(let k in data){
            if(data[k] != undefined){
                cp[k] = data[k]
            }
        }
    }    
    headers.s = check(cp)
    if(data && Object.keys(data).length){
        data = qs.stringify(data)
        // headers["Content-Type"] = 'application/json'
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    config.params = params
    config.data = data
    config.timeout = 1000 * 10
    if (headers){
        config.headers = headers
    }
    return config
}

class BaseApi{
    constructor(url = null){
        this.url = url
    }

    static fetch(method,url, urlPath, data = {}){

        if(!url){
            return Promise.reject("url not inited!")
        }
        return new Promise((resolve,reject)=>{
            axios(buildConfig(method,url,urlPath,data)).then(res=>{
                let code = res.data.TagCode || res.data.code || res.data.tagCode
                if(res.data.success){
                    code = 0
                }
                if (+code !== 0) {
                    return reject(res.data)
                } else {
                    return resolve(res.data)
                }
            }).catch(err=>{
                reject(err)
            })
        })
    
       
    }

    get(urlPath,data){
        return BaseApi.fetch("get",this.url || g_baseUrl,urlPath,data)
    }

    post(urlPath, data) {
        return BaseApi.fetch("post",this.url || g_baseUrl,urlPath,data)
    }
}

const initApi = url =>{
    g_baseUrl = url
}

export {
    BaseApi,
    initApi
}
