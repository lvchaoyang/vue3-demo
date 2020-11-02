import axios from '@/service/base/axios';
interface User {
    email: string;
    password: string;
}
export default class AuthService {
    /**
     * 登录
     * @param params 
     */
    static async login(params: User) {
        const res = await axios({
            url: '/user/login',
            method: 'post',
            data: params
        })
        return res;
    }
    /**
     * 获取用户信息
     */
    static async fetchCurrentUser() {
        const res = await axios({
            url: '/user/current',
            method: 'get'
        })
        return res;
    }
    static async signup(payload: UserSignupProps) {
        const res = await axios({
            url: '/users',
            method: 'post',
            data: payload
        })
        return res;
    }
}

interface UserSignupProps {
    email: string;
    nickName: string;
    password: string;
}