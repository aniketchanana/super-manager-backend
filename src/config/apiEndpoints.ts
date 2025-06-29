export const authEndpoints = Object.freeze({
  root: '/api/auth',
  register: '/register-admin',
  profile: '/profile',
  login: '/login',
  loginChildAccount: '/login-child-account',
  logout: '/logout',
});

export const orgEndpoints = Object.freeze({
  root: '/api/org',
  create: '/create',
  update: '/update/:id',
  get: '/get',
  addMember: '/addMember',
  deactivateMember: '/deactivateMember',
  getAllMembers: '/getAllMembers/:orgId',
  updateMember: '/updateMember/:memberId',
});

export const productEndpoints = Object.freeze({
  root: '/api/product',
  add: '/add',
  update: '/update/:productId',
  getAllProducts: '/getAllProducts',
  getProductById: '/getProductById/:productId',
});
