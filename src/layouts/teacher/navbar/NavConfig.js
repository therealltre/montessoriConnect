// routes
import { PATH_TEACHER } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  job: getIcon('ic_job'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Dashboard', path: PATH_TEACHER.general.app, icon: ICONS.dashboard },
      { title: 'Schedule', path: PATH_TEACHER.calendar, icon: ICONS.calendar },
      // { title: 'Schedule', path: PATH_TEACHER.general.analytics, icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'students',
        path: PATH_TEACHER.student.root,
        icon: ICONS.user,
        children: [
          // { title: 'profile', path: PATH_TEACHER.user.profile },
          // { title: 'cards', path: PATH_TEACHER.user.cards },
          { title: 'list', path: PATH_TEACHER.student.list },
          { title: 'add student', path: PATH_TEACHER.student.new },
          // { title: 'edit', path: PATH_TEACHER.user.demoEdit },
          // { title: 'account', path: PATH_TEACHER.user.account },
        ],
      },

      //jobs
      {
        title: 'job',
        path: PATH_TEACHER.job.cards,
        icon: ICONS.job,
      },

      // INVOICE
      // {
      //   title: 'invoice',
      //   path: PATH_TEACHER.invoice.root,
      //   icon: ICONS.invoice,
      //   children: [
      //     { title: 'list', path: PATH_TEACHER.invoice.list },
      //     // { title: 'details', path: PATH_TEACHER.invoice.demoView },
      //     { title: 'create', path: PATH_TEACHER.invoice.new },
      //     // { title: 'edit', path: PATH_TEACHER.invoice.demoEdit },
      //   ],
      // },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [{ title: 'calendar', path: PATH_TEACHER.calendar, icon: ICONS.calendar }],
  // },
];

export default navConfig;
