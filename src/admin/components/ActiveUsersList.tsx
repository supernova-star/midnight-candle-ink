import React, { useEffect, useState } from 'react';

import { RefreshCw } from 'lucide-react';

import { deleteUser, getUsers, User, UsersResponse } from '@/hooks/activeUsers';

import { Typography } from '@/components/uiComponents/typography/Typography';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';

import { DeleteVisitorModal } from './DeleteVisitorModal';
import { VisitorFilters, type VisitorFilter } from './VisitorFilters';
import { VisitorsTable } from './VisitorsTable';
import { UserDetailsModal } from './UserDetailsModal';

const hasOpenedAfterJoining = (user: User): boolean =>
  new Date(user.last_seen_at).getTime() > new Date(user.created_at).getTime();

const VISITORS_PER_PAGE = 20;

export const ActiveUsersList: React.FC = () => {
  const [userData, setUserData] = useState<UsersResponse>({
    users: [],
    totalUsers: 0,
    activeUsers: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [deletingBrowserId, setDeletingBrowserId] = useState<string | null>(
    null,
  );

  const [userPendingDeletion, setUserPendingDeletion] = useState<User | null>(
    null,
  );

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [visitorFilter, setVisitorFilter] = useState<VisitorFilter>('all');

  const [selectedCountry, setSelectedCountry] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const [errorMessage, setErrorMessage] = useState('');

  const countries = Array.from(
    new Set(
      userData.users
        .map((user) => user.country?.trim())
        .filter((country): country is string => Boolean(country)),
    ),
  ).sort((first, second) => first.localeCompare(second));

  const countryUsers = selectedCountry
    ? userData.users.filter((user) => user.country?.trim() === selectedCountry)
    : userData.users;

  const filteredUsers = countryUsers.filter((user) => {
    if (visitorFilter === 'active') {
      return user.is_active;
    }

    if (visitorFilter === 'returned') {
      return hasOpenedAfterJoining(user);
    }

    return true;
  });

  const filterOptions: {
    label: string;
    filter: VisitorFilter;
    count: number;
  }[] = [
    { label: 'All', filter: 'all', count: countryUsers.length },
    {
      label: 'Active now',
      filter: 'active',
      count: countryUsers.filter((user) => user.is_active).length,
    },
    {
      label: 'Opened after joining',
      filter: 'returned',
      count: countryUsers.filter(hasOpenedAfterJoining).length,
    },
  ];

  const pageCount = Math.ceil(filteredUsers.length / VISITORS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, Math.max(pageCount, 1));
  const paginatedUsers = filteredUsers.slice(
    (safeCurrentPage - 1) * VISITORS_PER_PAGE,
    safeCurrentPage * VISITORS_PER_PAGE,
  );

  const handleFilterChange = (filter: VisitorFilter): void => {
    setVisitorFilter(filter);
    setCurrentPage(1);
  };

  const handleCountryChange = (country: string): void => {
    setSelectedCountry(country);
    setCurrentPage(1);
  };

  const loadUsers = async (): Promise<void> => {
    setIsRefreshing(true);
    setErrorMessage('');

    try {
      setUserData(await getUsers());
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!userPendingDeletion) {
      return;
    }

    const browserId = userPendingDeletion.browser_id;

    setDeletingBrowserId(browserId);
    setErrorMessage('');

    try {
      await deleteUser(browserId);
      await loadUsers();
    } catch {
      setErrorMessage('Unable to delete this visitor. Please try again.');
    } finally {
      setDeletingBrowserId(null);
      setUserPendingDeletion(null);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(pageCount, 1)));
  }, [pageCount]);

  useEffect(() => {
    if (
      selectedCountry &&
      !userData.users.some((user) => user.country?.trim() === selectedCountry)
    ) {
      setSelectedCountry('');
      setCurrentPage(1);
    }
  }, [selectedCountry, userData.users]);

  return (
    <ColumnFlexContainer
      gap={[4]}
      padding={[4, 0]}
      flex={1}
      minHeight={[0]}
      sx={{
        minWidth: 0,
      }}
    >
      {/* Page heading */}
      <RowFlexContainer
        alignItems="center"
        justifyContent="between"
        gap={[3]}
        sx={{
          '@media (max-width: 600px)': {
            alignItems: 'flex-start',
          },
        }}
      >
        <ColumnFlexContainer gap={[1]}>
          <Typography
            color="var(--admin-text-primary)"
            variant="h5"
            weight="semiBold"
          >
            Visitors
          </Typography>

          <Typography color="var(--admin-text-muted)" variant="body2">
            {userData.activeUsers} active · {userData.totalUsers} total
          </Typography>
        </ColumnFlexContainer>

        <Button
          text={isRefreshing ? 'Refreshing...' : 'Refresh'}
          size="small"
          variant="contained"
          iconOptions={{
            icon: RefreshCw,
            iconColor: 'var(--admin-button-primary-text)',
          }}
          textOptions={{
            textColor: 'var(--admin-button-primary-text)',
            textWeight: 'bold',
          }}
          buttonStyles={{
            bgColor: 'var(--admin-button-primary)',
            borderRadius: [2],
          }}
          disabled={isRefreshing}
          onClick={() => void loadUsers()}
          sx={{
            flexShrink: 0,
            '&:hover': {
              backgroundColor: 'var(--admin-button-primary-hover)',
            },
          }}
        />
      </RowFlexContainer>

      <VisitorFilters
        options={filterOptions}
        selectedFilter={visitorFilter}
        onChange={handleFilterChange}
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={handleCountryChange}
      />

      {errorMessage && (
        <Typography color="var(--admin-danger)" variant="body2">
          {errorMessage}
        </Typography>
      )}

      <VisitorsTable
        users={paginatedUsers}
        hasAnyUsers={userData.users.length > 0}
        isLoading={isLoading}
        deletingBrowserId={deletingBrowserId}
        totalCount={filteredUsers.length}
        currentPage={safeCurrentPage}
        pageSize={VISITORS_PER_PAGE}
        onPageChange={setCurrentPage}
        onSelectUser={setSelectedUser}
        onRequestDelete={setUserPendingDeletion}
      />

      {/* User details modal */}
      <UserDetailsModal
        user={selectedUser}
        open={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
      />

      {/* Delete modal */}
      <DeleteVisitorModal
        user={userPendingDeletion}
        isDeleting={Boolean(deletingBrowserId)}
        onClose={() => setUserPendingDeletion(null)}
        onConfirm={() => void handleDelete()}
      />
    </ColumnFlexContainer>
  );
};
