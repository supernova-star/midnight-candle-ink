export interface User {
  browser_id: string;
  created_at: string;
  last_seen_at: string;
  is_active: boolean;
  user_name: string | null;
  city: string;
  region: string;
  country: string;
}

export interface UsersResponse {
  users: User[];
  totalUsers: number;
  activeUsers: number;
}

export const getUsers = async (): Promise<UsersResponse> => {
  const response = await fetch('/api/admin/users');

  if (!response.ok) {
    return {
      users: [],
      totalUsers: 0,
      activeUsers: 0,
    };
  }

  return (await response.json()) as UsersResponse;
};

export const deleteUser = async (browserId: string): Promise<void> => {
  const response = await fetch(
    `/api/admin/users?browser_id=${encodeURIComponent(browserId)}`,
    { method: 'DELETE' },
  );

  if (!response.ok) {
    throw new Error('Unable to delete visitor');
  }
};
