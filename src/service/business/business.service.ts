import axios from '@/service/base/axios';
import { PostProps } from '../../store';

export default class BusinessService {
    /**
     * 首页专栏列表
     */
    static async fetchColumns() {
        const res = await axios({
            method: 'get',
            url: '/columns',
        })
        return res;
    }
    /**
     * 专栏详情
     * @param cid 
     */
    static async fetchColumn (cid: string) {
        const res = await axios({
            method: 'get',
            url: `/columns/${cid}`,
        })
        return res;
    }
    /**
     * 专栏文章列表
     * @param cid 
     */
    static async fetchPosts (cid: string) {
        const res = await axios({
            method: 'get',
            url: `/columns/${cid}/posts`,
        })
        return res;
    }
    /**
     * 上传图片
     * @param url 
     * @param form 
     */
    static async upload(url: string, form: FormData) {
        const res = await axios({
            method: 'post',
            url: url,
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res;
    }
    /**
     * 创建文章
     * @param params 
     */
    static async createPost(params: PostProps) {
        const res = await axios({
            method: 'post',
            url: '/posts',
            data: params
        })
        return res;
    }
}