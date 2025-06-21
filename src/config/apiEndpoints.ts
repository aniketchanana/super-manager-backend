export const authEndpoints = {
  root: '/api/auth',
  register: '/register-admin',
  profile: '/profile',
  login: '/login',
  loginChildAccount: '/login-child-account',
  logout: '/logout',
  logoutChildAccount: '/logout-child-account',
};

export const orgEndpoints = {
  root: '/api/org',
  create: '/create',
  update: '/update/:id',
  get: '/get',
  addMember: '/addMember',
  deactivateMember: '/deactivateMember',
};
