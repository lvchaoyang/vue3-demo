import axios from '@/service/base/axios';

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
}