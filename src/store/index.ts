import { createStore, Commit } from 'vuex'
import { ColumnPostsListProps, ColumnProps , UserProps, PostsProps } from '../interface/props'
import { getToken, setToken } from '../tool/tool'
import { AxiosRequestConfig } from 'axios'
import request  from '../request/request'

export interface  GlobalDataProps {
  user: UserProps
  columnList: ColumnPostsListProps<ColumnProps>,
  postsList: ColumnPostsListProps<PostsProps>,
  loading: boolean,
  error: ErrorProp
}

export interface LoginProp {
  email: string
  password: string
}

export interface ErrorProp {
  status: boolean
  message?: string
}

export interface PageProp {
  currentPage: number
  pageSize: number
}
const requireMethod = async (config: AxiosRequestConfig = { method: 'GET' }, mutationsName: string, commit: Commit, extraData?: any) => {
  const data = await request(config)
  if (extraData) {
    commit(mutationsName, { data, extraData })
  } else {
    commit(mutationsName, data)
  }
}
const store = createStore<GlobalDataProps>({
  state: {
    user: {
      isLogin: false,
      nickName: '',
      token: getToken(),
    },
    columnList: {
      currentPage: 0,
      list: [],
      pageSize: 6,
      count: 0
    },
    postsList: {
      currentPage: 0,
      list: [],
      pageSize: 6,
      count: 0
    },
    loading: false,
    error: {
      status: false
    }
  },
  mutations: {
    addPost(state , data) {
      state.postsList.list.push(data)
    },
    login(state, logininfo) {
      const token = `Bearer ${logininfo.data.token}`
      state.user.token = token
      setToken(token)
    },
    getCurrent(state, data) {
      state.user.isLogin = true
      Object.assign(state.user, data.data)
    },
    register (state, data) {
      
    },
    setLoading (state, data) {
      state.loading = data
    },
    logout (state) {
      state.user = {
        isLogin: false,
        nickName: '',
        token: null
      }
      localStorage.removeItem('token')
    },
    setError (state, error) {
      state.error = error
    },
    setColumnList(state, data) {
      const oldList = [...state.columnList.list]
      state.columnList = Object.assign(data.data, { list: oldList.concat(data.data.list) })
    }
  },
  actions: {
    register ({ commit }, data) {
      return requireMethod({ url: 'users', method: 'POST', data }, 'register', commit)
    },
    login({ commit }, data: LoginProp) {
      return requireMethod({ url: 'user/login', method: 'POST', data }, 'login', commit)
    },
    getCurrent ({ commit }) {
      return requireMethod({ url: 'user/current', method: 'GET' }, 'getCurrent', commit)
    },
    loginAndgetCurrent ({ dispatch }, loginInfo) {
      return dispatch('login', loginInfo).then(res => {
        return dispatch('getCurrent')
      })
    },
    getColmnList({ commit }, pageInfo: PageProp) {
      return requireMethod({ url: `/columns?currentPage=${pageInfo.currentPage}&pageSize=${pageInfo.pageSize}`, method: 'GET' }, 'setColumnList', commit)
    }
  }
})

export default store