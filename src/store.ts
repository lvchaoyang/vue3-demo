import { createStore} from 'vuex'
import BusinessService from '@/service/business/business.service';
import AuthService from '@/service/auth/auth.service';
export interface ResponseType<T = {}> {
    code: number;
    message: string;
    data: T;
}
export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
    avatar?: ImageProps;
    description?: string;
  }
export interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
    fitUrl?: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}
export interface PostProps {
    _id?: string;
    title: string;
    excerpt?: string; // 摘要
    content?: string;
    image?: ImageProps | string;
    createdAt?: string;
    column: string;
    author?: string | UserProps;
    isHTML?: boolean;
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
        fetchPost(state, rawData) {
            state.posts.push(rawData.data);
        },
        /**
         * 创建文章
         * @param state 
         * @param newPost 
         */
        createPost(state, rawData) {
            state.posts.push(rawData.data);
        },
        /**
         * 更新文章
         * @param state 
         * @param rawData 
         */
        updatePost(state, rawData) {
            state.posts = state.posts.map(item => {
                if (item._id === rawData.data._id) {
                    item = rawData;
                }
                return item;
            })
        },
        /**
         * 删除文章
         * @param state 
         * @param rawData 
         */
        deletePost(state, rawData) {
            state.posts = state.posts.filter(item => item._id !== rawData.data._id)
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
        /**
         * 获取文章详情
         * @param param0 
         * @param id 
         */
        async fetchPost({ state, commit }, id) {
            const currentPost = state.posts[id]
            if (!currentPost || !currentPost.content) {
              const res = await BusinessService.fetchPost(id);
              commit('fetchPost', res.data);
              return res.data;
            } else {
              return Promise.resolve({ data: currentPost })
            }
          },
        /**
         * 创建文章
         * @param param0 
         * @param payload 
         */
        async createPost({ commit }, payload) {
            const res = await BusinessService.createPost(payload);
            commit('createPost', res.data);
        },
        async updatePost({ commit }, { id, payload }) {
            const res = await BusinessService.updatePost(id, payload);
            commit('createPost', res.data);
          },
        async deletePost({commit}, id) {
            const res = await BusinessService.deletePost(id);
            commit('deletePost', res.data);
            return res.data;
        }
    },
    getters: {
        getColumnById: (state) => (id: string) => {
            return state.columns.find(item => item._id === id)
        },
        getPostsByCid: (state) => (cid: string) => {
            return state.posts.filter(post => post.column === cid)
        },
        getCurrentPost: (state) => (id: string) => {
            return state.posts.find(item => item._id === id)
          }
    }
})
export default store