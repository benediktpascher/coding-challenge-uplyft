export type UserId = string;

export interface UserIdsResult {
  userIds: UserId[]
  count: number
}

export type SourceDBUserIdsGet = () => Promise<UserIdsResult>;

export interface User {
  id: UserId
  email: string
  balance: number
}

export type SourceDBUserGet = (id: UserId) => Promise<User>;
export type TargetDBUserPut = (user: User) => Promise<void>;

export interface Dependencies {
  userIdsGet: SourceDBUserIdsGet
  userGet: SourceDBUserGet
  userPut: TargetDBUserPut
}

export type SyncUsers = (dependencies: Dependencies) => Promise<void>;
