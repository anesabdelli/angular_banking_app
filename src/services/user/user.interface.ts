export interface User {
  name: string;
  clientCode: string;
}

export interface UserRepository {
  getCurrentUser(): User | null;
}
