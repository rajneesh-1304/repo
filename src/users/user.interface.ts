export interface Users {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
  is_banned: boolean;
}
