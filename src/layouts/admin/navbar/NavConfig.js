// routes
import { PATH_ADMIN } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  teacher: getIcon('ic_teacher'),
  students: getIcon('ic_user'),
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
    subheader: 'overview',
    items: [
      { title: 'app', path: PATH_ADMIN.general.app, icon: ICONS.dashboard },
      { title: 'analytics', path: PATH_ADMIN.general.analytics, icon: ICONS.analytics },
      { title: 'banking', path: PATH_ADMIN.general.banking, icon: ICONS.banking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_ADMIN.user.root,
        icon: ICONS.teacher,
        children: [
          { title: 'profile', path: PATH_ADMIN.user.profile },
          { title: 'cards', path: PATH_ADMIN.user.cards },
          { title: 'list', path: PATH_ADMIN.user.list },
          { title: 'create', path: PATH_ADMIN.user.new },
          { title: 'edit', path: PATH_ADMIN.user.demoEdit },
          { title: 'account', path: PATH_ADMIN.user.account },
        ],
      },

      // INVOICE
      {
        title: 'invoice',
        path: PATH_ADMIN.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_ADMIN.invoice.list },
          { title: 'details', path: PATH_ADMIN.invoice.demoView },
          { title: 'create', path: PATH_ADMIN.invoice.new },
          { title: 'edit', path: PATH_ADMIN.invoice.demoEdit },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      // { title: 'chat', path: PATH_ADMIN.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_ADMIN.calendar, icon: ICONS.calendar },
    ],
  },
];

export default navConfig;
