module.exports = {
  USER: {
    LOGIN: 'login',
    REGISTER: 'register',
    FORGET: 'forget',
  },
  USER_ROLE: {
    ADMIN: 'admin',
    VISITOR: 'visitor'
  },
  // 文章状态
  ARTICLE: {
    DELETE: 'delete',
    DRAFT: 'draft',
    PENDING: 'pending',
    PUBLISHED: 'published'
  },
  USER_ACTION: {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
  },
  // 状态
  POST_SORT_TYPE: {
    VIEW: 'view_count', // 浏览量
    LIKE: 'like_count',  // 点赞数量
    COLLECT: 'collect_count',  // 搜藏数量
    NEW: 'createdAt',  // 创建时间
  }
}