interface AvatarProps {
  _id?: string
  url?: string 
}
export interface ColumnProps {
  author: string
  title: string
  description: string
  avatar: AvatarProps
  createdAt: string
  key: number
  featured: boolean
  _id: string
}

export interface UserProps {
  isLogin: boolean
  column?: string
  description?: string
  email?: string
  nickName?: string
  _id?: string,
  token: null | string
}

export interface PostsProps {
  author: string
  column: string
  createdAt: string
  excerpt?: string
  image: AvatarProps
  key?: number
  _id?: string
  title: string
  content?: string
}

export interface PostsListProps {
  count: number,
  currentPage: number,
  pageSize: number,
  list: PostsProps[]
}

export interface ColumnPostsListProps<T> {
  count: number,
  currentPage: number,
  pageSize: number,
  list: T[]
}
