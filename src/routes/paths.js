// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_TEACHER = '/teacher';
const ROOTS_ADMIN = '/admin';
const ROOT_CAREER = '/career';
const ROOT_EVENTS = '/events';
const ROOT_SCHOOLS = '/schools';
const ROOT_TUTORS = '/tutors';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  aboutMontessori: '/about-montessori',
  contact: '/contact-us',
  schools: '/schools',
  tutors: '/tutors',
  career: '/career',
  events: '/events',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PAGE_CAREER = {
  root: ROOT_CAREER,
  career: {
    details: (title) => path(ROOT_CAREER, `/${title}/details`),
  },
};

export const PAGE_EVENTS = {
  root: ROOT_EVENTS,
  events: {
    details: (title) => path(ROOT_EVENTS, `/${title}/details`),
  },
};

export const PAGE_SCHOOLS = {
  root: ROOT_SCHOOLS,
  schools: {
    details: (title) => path(ROOT_SCHOOLS, `/${title}/details`),
  },
};

export const PAGE_TUTORS = {
  root: ROOT_TUTORS,
  tutors: {
    details: (title) => path(ROOT_TUTORS, `/${title}/details`),
  },
};

//school-dashboard-----------------------------------------------------
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },

  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },

  calendar: path(ROOTS_DASHBOARD, '/calendar'),

  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    // demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },

  student: {
    root: path(ROOTS_DASHBOARD, '/student'),
    new: path(ROOTS_DASHBOARD, '/student/new'),
    list: path(ROOTS_DASHBOARD, '/student/list'),
    cards: path(ROOTS_DASHBOARD, '/student/cards'),
    profile: path(ROOTS_DASHBOARD, '/student/profile'),
    account: path(ROOTS_DASHBOARD, '/student/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/student/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/student/oliver-thompson/edit`),
  },

  job: {
    root: path(ROOTS_DASHBOARD, '/job'),
    new: path(ROOTS_DASHBOARD, '/job/new'),
    // list: path(ROOTS_DASHBOARD, '/job/list'),
    cards: path(ROOTS_DASHBOARD, '/job/cards'),
    details: (title) => path(ROOTS_DASHBOARD, `/job/${title}/details`),
    edit: (title) => path(ROOTS_DASHBOARD, `/job/${title}/edit`),
    // profile: path(ROOTS_DASHBOARD, '/job/profile'),
    // account: path(ROOTS_DASHBOARD, '/job/account'),

    // demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },

  events: {
    root: path(ROOTS_DASHBOARD, '/events'),
    new: path(ROOTS_DASHBOARD, '/events/new'),
    // list: path(ROOTS_DASHBOARD, '/job/list'),
    cards: path(ROOTS_DASHBOARD, '/events/cards'),
    details: (title) => path(ROOTS_DASHBOARD, `/events/${title}/details`),
    edit: (title) => path(ROOTS_DASHBOARD, `/events/${title}/edit`),
    // profile: path(ROOTS_DASHBOARD, '/job/profile'),
    // account: path(ROOTS_DASHBOARD, '/job/account'),

    // demoEdit: path(ROOTS_DASHBOARD, `/events/montessori-teacher/edit`),
  },

  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
};

//admin-dashboard-----------------------------------------------------
export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  general: {
    app: path(ROOTS_ADMIN, '/app'),
    ecommerce: path(ROOTS_ADMIN, '/ecommerce'),
    analytics: path(ROOTS_ADMIN, '/analytics'),
    banking: path(ROOTS_ADMIN, '/banking'),
    booking: path(ROOTS_ADMIN, '/booking'),
  },

  chat: {
    root: path(ROOTS_ADMIN, '/chat'),
    new: path(ROOTS_ADMIN, '/chat/new'),
    view: (name) => path(ROOTS_ADMIN, `/chat/${name}`),
  },

  calendar: path(ROOTS_ADMIN, '/calendar'),

  user: {
    root: path(ROOTS_ADMIN, '/user'),
    new: path(ROOTS_ADMIN, '/user/new'),
    list: path(ROOTS_ADMIN, '/user/list'),
    cards: path(ROOTS_ADMIN, '/user/cards'),
    profile: path(ROOTS_ADMIN, '/user/profile'),
    account: path(ROOTS_ADMIN, '/user/account'),
    edit: (name) => path(ROOTS_ADMIN, `/user/${name}/edit`),
    demoEdit: path(ROOTS_ADMIN, `/user/reece-chung/edit`),
  },

  invoice: {
    root: path(ROOTS_ADMIN, '/invoice'),
    list: path(ROOTS_ADMIN, '/invoice/list'),
    new: path(ROOTS_ADMIN, '/invoice/new'),
    view: (id) => path(ROOTS_ADMIN, `/invoice/${id}`),
    edit: (id) => path(ROOTS_ADMIN, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_ADMIN, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_ADMIN, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
};

//teacher-dashboard-----------------------------------------------------
export const PATH_TEACHER = {
  root: ROOTS_TEACHER,
  general: {
    app: path(ROOTS_TEACHER, '/app'),
    ecommerce: path(ROOTS_TEACHER, '/ecommerce'),
    analytics: path(ROOTS_TEACHER, '/analytics'),
    banking: path(ROOTS_TEACHER, '/banking'),
    booking: path(ROOTS_TEACHER, '/booking'),
  },

  // chat: {
  //   root: path(ROOTS_TEACHER, '/chat'),
  //   new: path(ROOTS_TEACHER, '/chat/new'),
  //   view: (name) => path(ROOTS_TEACHER, `/chat/${name}`),
  // },

  calendar: path(ROOTS_TEACHER, '/calendar'),

  user: {
    root: path(ROOTS_TEACHER, '/user'),
    // new: path(ROOTS_TEACHER, '/user/new'),
    // list: path(ROOTS_TEACHER, '/user/list'),
    // cards: path(ROOTS_TEACHER, '/user/cards'),
    profile: path(ROOTS_TEACHER, '/user/profile'),
    account: path(ROOTS_TEACHER, '/user/account'),
    // edit: (name) => path(ROOTS_TEACHER, `/user/${name}/edit`),
    // demoEdit: path(ROOTS_TEACHER, `/user/reece-chung/edit`),
  },

  student: {
    root: path(ROOTS_TEACHER, '/student'),
    new: path(ROOTS_TEACHER, '/student/new'),
    list: path(ROOTS_TEACHER, '/student/list'),
    cards: path(ROOTS_TEACHER, '/student/cards'),
    profile: path(ROOTS_TEACHER, '/student/profile'),
    account: path(ROOTS_TEACHER, '/student/account'),
    edit: (name) => path(ROOTS_TEACHER, `/student/${name}/edit`),
    demoEdit: path(ROOTS_TEACHER, `/student/oliver-thompson/edit`),
  },

  job: {
    root: path(ROOTS_TEACHER, '/job'),
    new: path(ROOTS_TEACHER, '/job/new'),
    list: path(ROOTS_TEACHER, '/job/list'),
    cards: path(ROOTS_TEACHER, '/job/cards'),
    details: (title) => path(ROOTS_TEACHER, `/job/${title}/details`),
    edit: (title) => path(ROOTS_TEACHER, `/job/${title}/edit`),
    // profile: path(ROOTS_DASHBOARD, '/job/profile'),
    // account: path(ROOTS_DASHBOARD, '/job/account'),

    // demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  invoice: {
    root: path(ROOTS_TEACHER, '/invoice'),
    list: path(ROOTS_TEACHER, '/invoice/list'),
    new: path(ROOTS_TEACHER, '/invoice/new'),
    view: (id) => path(ROOTS_TEACHER, `/invoice/${id}`),
    edit: (id) => path(ROOTS_TEACHER, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_TEACHER, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_TEACHER, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
};
