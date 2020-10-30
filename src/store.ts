import { createStore} from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData';
export interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: string;
    columnId?: number;
}
export interface GlobalDataProps {
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
}
const store = createStore<GlobalDataProps>({
    state: {
        columns: testData,
        posts: testPosts,
        user: { isLogin: true, columnId: 1 }
    },
    mutations: {
        login(state) {
            state.user = {...state.user, isLogin: true, name: "Young"}
        },
        createPost(state, newPost) {
            state.posts.push(newPost);
        }
    },
    getters: {
        getColumnById: (state) => (id: number) => {
            return state.columns.find(item => item.id === id)
        },
        getPostsByCid: (state) => (cid: number) => {
            return state.posts.filter(post => post.columnId === cid)
        }
    }
})
export default store