export interface UserStoreInterface {
  token: string;
  expires: number;
  data: Record<string, any>;
  set: (state: Partial<UserStoreInterface>) => void;
  clear: () => void;
}
