# Instructions for candidate

We need to synchronize user data across two databases, and would like a function to trigger a synchronization of all existing users.
While there are no hard limits on execution duration, temporal performance should be considered.

## Functions we can use to access the databases

### Getting user ids

We have a function for getting the ids of all users (without the user data) from the source database.

```
export interface UserIdsResult {
  userIds: UserId[]
  count: number
}

export type SourceDBUserIdsGet = () => Promise<UserIdsResult>;
```

This returns all user ids in one call. There's no need to paginate.

### Getting user data

To get the data of a user it has to be fetched individually.

```
export interface User {
  id: UserId
  email: string
  balance: number
}

export type SourceDBUserGet = (id: UserId) => Promise<User>
```

This request can be made concurrently, but supports only a certain number of requests per second. 
In the current example implementation of the database, the limit is 3 requests per second.
You can otherwise assume that the database calls will succeed, i.e. you don't have to worry about handling any exceptions other than the rate limiting ones. 
All user ids are valid and there is data for every user.
It can be assumed, that the returned data is always complete.

### Writing user data

Once we've retrieved the data we can write it to the target database thusly:

```
export type TargetDBUserPut = (user: User) => Promise<void>;
```

### Using the functions

The functions are injected with a `dependencies` object, and can be used in the implementation like this:

```
export interface Dependencies {
  userIdsGet: SourceDBUserIdsGet
  userGet: SourceDBUserGet
  userPut: TargetDBUserPut
}

export default async (dependencies: Dependencies) => {
  const userIdsResult = await dependencies.userIdsGet();
};
```

## Task

Complete the `syncUsers` function in [syncUsers.ts](syncUsers.ts), taking into account the constraints on the `SourceDBUserGet` request. 
Your solution should fetch every user from the source database and put it in the target database. 
Make sure that all users are successfully synchronized, and that it is done in a way that is reasonably performant.
