export const authEndpoints = {
  root: '/api/auth',
  register: '/register-admin',
  profile: '/admin/profile',
  login: '/login',
  loginChildAccount: '/login-child-account',
  logout: '/logout',
  logoutChildAccount: '/logout-child-account',
};

export const orgEndpoints = {
  root: '/api/org',
  create: '/create',
  update: '/update/:id',
  get: '/get/:id',
  addMember: '/addMember',
  deactivateMember: '/deactivateMember',
};
