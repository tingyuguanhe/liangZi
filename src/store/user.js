import { checkLogin } from '@/api/api'
const menu = {
    state:{
       user_name:''
    },
    mutations:{
       set_user_name:(state, name) => {
           state.user_name = name;
       }
        
    },
    actions:{
        get_user_info:({commit}) => {
            checkLogin().then(
                (resData) => {
                    if(resData && resData.status == 'ok'){
                        commit('set_user_name',resData.data.username);
                    }else{
                        console.log('获取信息失败');
                    }
                }
            )
        }
    }
}

export default menu