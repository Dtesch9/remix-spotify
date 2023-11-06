import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { logout } from '@/services';

export const action = async ({ request }: ActionFunctionArgs) => {
  return logout(request);
};

export const loader = async () => redirect('/');
