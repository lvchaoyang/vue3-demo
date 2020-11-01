import { createStore} from 'vuex'
import BusinessService from '@/service/business/business.service';
import AuthService from '@/service/auth/auth.service';
export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
    description?: string;
  }
interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}
export interface PostProps {
    _id: string;
    title: string;
    excerpt?: string; // 摘要
    content: string;
    image?: ImageProps;
    createdAt: string;
    column: string;
}
export interface GolbalErrorProps {
    status: boolean;
    message?: string;
}
export interface GlobalDataProps {
    error: GolbalErrorProps;
    token: string;
    loading: boolean;
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
}
const store = createStore<GlobalDataProps>({
    state: {
        token: localStorage.getItem('token') || '',
        error: { status: false },
        loading: false,
        columns: [],
        posts: [],
        user: { isLogin: false }
    },
    mutations: {
        /**
         * 登录
         * @param state 
         * @param rowData 
         */
        login(state, rawData) {
            const { token } = rawData.data
            state.token = token
            localStorage.setItem('token', token);
        },
        /**
         * 退出登录
         * @param state 
         */
        logout(state) {
            state.token = ''
            state.user = { isLogin: false }
            localStorage.remove('token')
        },
        /**
         * 获取用户信息
         * @param state 
         * @param rawData 
         */
        fetchCurrentUser (state, rawData) {
            state.user = { isLogin: true, ...rawData.data};
        },
        /**
         * 获取专栏列表
         * @param state 
         * @param rawData 
         */
        fetchColumns(state, rawData) {
            state.columns = rawData.data.list;
        },
        /**
         * 获取专栏详情
         * @param state 
         * @param rawData 
         */
        fetchColumn(state, rawData) {
            state.columns = [rawData.data];
        },
        /**
         * 获取当前专栏文章列表
         * @param state 
         * @param rawData 
         */
        fetchPosts(state, rawData) {
            state.posts = rawData.data.list;
        },
        /**
         * 创建文章
         * @param state 
         * @param newPost 
         */
        createPost(state, newPost) {
            state.posts.push(newPost);
        },
        setLoading(state, status) {
            state.loading = status;
        },
        setError(state, e: GolbalErrorProps) {
            state.error = e;
        }
    },
    actions: {
        /**
         * 登录
         * @param param0 
         * @param paload 
         */
        async login({ commit }, paload) {
            const res = await AuthService.login(paload);
            commit('login', res.data);
        },
        /**
         * 获取用户信息
         * @param param0 
         */
        async fetchCurrentUser({ commit }) {
            const res = await AuthService.fetchCurrentUser();
            commit('fetchCurrentUser', res.data);
        },
        /**
         * 登录并获取用户信息
         */
        loginAndFetch({ dispatch }, loginData) {
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser')
            })
        },
        /**
         * 首页专栏列表
         * @param param0 
         */
        async fetchColumns({ commit }) {
            const res = await BusinessService.fetchColumns()
            commit('fetchColumns', res.data);
        },
        /**
         * 专栏详情
         * @param param0 
         */
        async fetchColumn({ commit }, cid) {
            const res = await BusinessService.fetchColumn(cid);
            commit('fetchColumn', res.data)
        },
        /**
         * 专栏文章列表
         * @param param0 
         * @param cid 
         */
        async fetchPosts({ commit }, cid) {
            const res = await BusinessService.fetchPosts(cid);
            commit('fetchPosts', res.data)
        },
       
        
    },
    getters: {
        getColumnById: (state) => (id: string) => {
            return state.columns.find(item => item._id === id)
        },
        getPostsByCid: (state) => (cid: string) => {
            return state.posts.filter(post => post.column === cid)
        }
    }
})
export default store