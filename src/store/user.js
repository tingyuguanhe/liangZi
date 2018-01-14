import { checkLogin,loginOut } from '@/api/api'
const menu = {
    state:{
       user_name:'',
       download_url:'',
       extra_money:''
    },
    mutations:{
       SET_USER_NAME:(state, name) => {
            state.user_name = name; 
       },
       SET_DOWNLOAD_URL:(state, url) => {
            state.download_url = url
       },
       SET_MONEY: (state, money) => {
        state.extra_money = money
       }
        
    },
    actions:{
        get_user_info:({commit}) => {
            return new Promise((resolve, reject) => {
                checkLogin().then(
                    (resData) => {
                        commit('SET_DOWNLOAD_URL', resData.data.download);
                        if(resData && resData.status == 'ok'){
                            commit('SET_USER_NAME',resData.data.username);
                            commit('SET_MONEY', resData.data.extra_money);
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