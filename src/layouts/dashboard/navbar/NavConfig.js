// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  job: getIcon('ic_job'),
  chat: getIcon('ic_chat'),
  teacher: getIcon('ic_teacher'),
  students: getIcon('ic_user'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  event: getIcon('ic_event'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // Teacher
      {
        title: 'teachers',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.teacher,
        children: [
          // { title: 'profile', path: PATH_DASHBOARD.user.profile },
          // { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          // { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      // Students
      {
        title: 'students',
        path: PATH_DASHBOARD.student.root,
        icon: ICONS.students,
        children: [
          // { title: 'profile', path: PATH_DASHBOARD.student.profile },
          // { title: 'cards', path: PATH_DASHBOARD.student.cards },
          { title: 'list', path: PATH_DASHBOARD.student.list },
          { title: 'create', path: PATH_DASHBOARD.student.new },
          // { title: 'edit', path: PATH_DASHBOARD.student.demoEdit },
          // { title: 'account', path: PATH_DASHBOARD.student.account },
        ],
      },

      //jobs
      {
        title: 'job',
        path: PATH_DASHBOARD.job.root,
        icon: ICONS.job,
        children: [
          // { title: 'profile', path: PATH_DASHBOARD.job.profile },
          { title: 'cards', path: PATH_DASHBOARD.job.cards },
          // { title: 'list', path: PATH_DASHBOARD.job.list },
          { title: 'create', path: PATH_DASHBOARD.job.new },
          // { title: 'details', path: PATH_DASHBOARD.job.details },
          // { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          // { title: 'account', path: PATH_DASHBOARD.job.account },
        ],
      },

      // INVOICE
      {
        title: 'invoice',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      // { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      {
        title: 'events',
        path: PATH_DASHBOARD.events.root,
        icon: ICONS.event,
        children: [
          { title: 'list', path: PATH_DASHBOARD.events.cards },
          { title: 'create', path: PATH_DASHBOARD.events.new },
          // { title: 'details', path: PATH_DASHBOARD.job.details },
          // { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
        ],
      },
    ],
  },
];

export default navConfig;
