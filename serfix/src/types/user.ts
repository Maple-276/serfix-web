export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'admin' | 'user';
  createdAt?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}
