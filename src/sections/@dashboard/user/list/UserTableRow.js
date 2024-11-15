import { paramCase } from 'change-case';
import React, { useCallback, useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// mui
import {
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  TablePagination,
  TableSortLabel,
  Typography,
  Tooltip,
  IconButton,
  Container,
  Card,
  Divider,
  Box,
  FormControlLabel,
  Switch,
  Checkbox,
  Avatar,
  MenuItem,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useTable, { emptyRows } from '../../../../hooks/useTable';
// layout
import Layout from '../../../../layouts';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Iconify from '../../../../components/Iconify';
import Page from '../../../../components/Page';
// sections
import axios from '../../../../utils/axios';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import UserTableToolbar from './UserTableToolbar';
import Scrollbar from '../../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../../components/table';
import Label from '../../../../components/Label';
import MenuPopover from '../../../../components/MenuPopover';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'inactive'];

const ROLE_OPTIONS = ['all', 'student', 'teacher', 'admin'];

const TABLE_HEAD = [
  { id: 'displayName', label: 'Name', align: 'left' },
  { id: 'company', label: 'Company', align: 'left' },
  { id: 'phoneNumber', label: 'Phone Number', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'isVerified', label: 'Verified', align: 'center' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserTable.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function UserTable() {
  const theme = useTheme();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const isMountedRef = useIsMountedRef();
  const [users, setUsers] = useState([]);
  const { themeStretch } = useSettings();
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openMenu, setOpenMenu] = useState(null); // Store row ID instead of event target
  const [anchorEl, setAnchorEl] = useState(null); // Store anchor element for menu positioning
  // const { currentTab, onChangeTab } = useTabs('all');

  const { push } = useRouter();

  const { dense, selected, setSelected, onSelectRow, onSelectAllRows, onSort, onChangeDense } = useTable();

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get('/api/users');

      if (isMountedRef.current) {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Open the menu and set the anchor element
  const handleOpenMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(id);
  };

  // Close the menu and reset the anchor element
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
    setPage(0);
  };

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterStatus = (event, newValue) => {
    setFilterStatus(newValue);
    setPage(0);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = users.filter((row) => row.id !== id);
    setSelected([]);
    setUsers(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = users.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setUsers(deleteRows);
  };

  const denseHeight = dense ? 52 : 72;

  const filteredUsers = users.filter((user) => {
    const matchesName = user.displayName.toLowerCase().includes(filterName.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesName && matchesRole && matchesStatus;
  });

  const isNotFound =
    (!stableSort.length && !!filterName) ||
    (!stableSort.length && !!filterRole) ||
    (!stableSort.length && !!filterStatus);

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.user.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New User
              </Button>
            </NextLink>
          }
        />
        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{ px: 2 }}
          >
            {STATUS_OPTIONS.map((tab) => {
              const count = users.filter((user) => (tab === 'all' ? true : user.status === tab)).length;
              const color = tab === 'active' ? 'success.main' : tab === 'inactive' ? 'error.main' : 'text.primary';

              return (
                <Tab
                  disableRipple
                  key={tab}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {tab}
                      <Box
                        sx={{
                          ml: 1,
                          px: 1.2,
                          py: 0.3,
                          bgcolor: color,
                          borderRadius: 1,
                          color: 'white',
                          display: 'inline-block',
                          minWidth: 24,
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {count}
                        </Typography>
                      </Box>
                    </Box>
                  }
                  value={tab}
                />
              );
            })}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={users.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      users.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      users.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {stableSort(filteredUsers, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, displayName, company, email, phoneNumber, role, isVerified, status, imageUrl } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onClick={() => onSelectRow(id)} />
                          </TableCell>

                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt={displayName} src={imageUrl} sx={{ mr: 2 }} />
                            <Grid>
                              <Typography
                                variant="subtitle2"
                                noWrap
                                sx={{
                                  cursor: 'pointer',
                                  textDecoration: 'none',
                                  '&:hover': { textDecoration: 'underline' },
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleEditRow(displayName);
                                }}
                              >
                                {displayName}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {email}
                              </Typography>
                            </Grid>
                          </TableCell>

                          <TableCell>{company}</TableCell>
                          <TableCell>{phoneNumber}</TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === 'role'}
                              direction={orderBy === 'role' ? order : 'asc'}
                              onClick={(event) => handleRequestSort(event, 'role')}
                            >
                              {role}
                            </TableSortLabel>
                          </TableCell>
                          <TableCell align="center">
                            <Iconify
                              icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
                              sx={{
                                width: 20,
                                height: 20,
                                color: 'success.main',
                                ...(!isVerified && { color: 'warning.main' }),
                              }}
                            />
                          </TableCell>

                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={(status === 'inactive' && 'error') || 'success'}
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {status}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              onClick={(event) => handleOpenMenu(event, id)} // Open menu on click
                            >
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                            <MenuPopover
                              anchorEl={anchorEl} // Anchor element for positioning
                              open={openMenu === id} // Check if the menu is open for this row
                              onClose={handleCloseMenu} // Close the menu
                              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                              arrow="right-top"
                              sx={{
                                mt: -1,
                                width: 160,
                                '& .MuiMenuItem-root': {
                                  px: 1,
                                  typography: 'body2',
                                  borderRadius: 0.75,
                                  '& svg': { mr: 2, width: 20, height: 20 },
                                },
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleDeleteRow(id);
                                  handleCloseMenu();
                                }}
                                sx={{ color: 'error.main' }}
                              >
                                <Iconify icon={'eva:trash-2-outline'} />
                                Delete
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleEditRow(displayName);
                                  handleCloseMenu();
                                }}
                              >
                                <Iconify icon={'eva:edit-fill'} />
                                Edit
                              </MenuItem>
                            </MenuPopover>
                          </TableCell>
                        </TableRow>
                      );
                    })}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, users.length)} />
                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
