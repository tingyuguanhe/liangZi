import { checkLogin,loginOut } from '@/api/api'
const menu = {
    state:{
       user_name:''
    },
    mutations:{
       SET_USER_NAME:(state, name) => {
           state.user_name = name;
           //console.log(name);
       }
        
    },
    actions:{
        get_user_info:({commit}) => {
            return new Promise((resolve, reject) => {
                checkLogin().then(
                    (resData) => {
                        if(resData && resData.status == 'ok'){
                            commit('SET_USER_NAME',resData.data.username);
                            resolve(resData);
                        }else{
                            //console.log('用户未登录');
                            resolve(resData);
                        }
                    }
                ).catch(err => {
                    reject(err);
                })
            })
            
        },
        login_out:({commit}) => {
            return new Promise((resolve,reject) => {
                loginOut().then(
                    (resData) => {
                        if(resData && resData.status == 'ok'){
                            commit('SET_USER_NAME', '');
                            resolve();
                        }else{
                            console.log('退出失败');
                        }
                    }
                ).catch( err => {
                    reject(err);
                })
            })
        },
        // 前端判断状态为error自己 登出
        fed_log_out({ commit }) {
            return new Promise(resolve => {
                commit('SET_USER_NAME', '');
                resolve();
            })
        }

    }
}

export default menu