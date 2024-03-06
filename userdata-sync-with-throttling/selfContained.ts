// // // // // // // // //
// This file contains everything needed to have the coding challenge.
// Suitable for shared IDEs etc.
// // // // // // // // //

const _ = require('lodash');

// Database implementation

const databaseData = _.times(100, (i) => ({
  id: `${i}`,
  email: `user${i}@email.com`,
  balance: i,
}));

// eslint-disable-next-line max-len
const randomDelays = [200, 492, 242, 91, 246, 499, 113, 463, 401, 139, 38, 151, 156, 42, 168, 295, 166, 25, 3441, 1359];

const userIdsGet = async () => Promise.resolve({
  userIds: databaseData.map((user) => user.id),
  count: databaseData.length,
});
const sleep = async (timeout: number) => new Promise((r) => setTimeout(r, timeout));

const maxGetRequestsPerSecond = 3;
const recentRequests = new Set();

const userGet = async (id: UserId) => {
  if (recentRequests.size > maxGetRequestsPerSecond) {
    return Promise.reject(new Error('Too many requests'));
  }

  recentRequests.add(id);
  setTimeout(() => { recentRequests.delete(id); }, 1000);

  await sleep(randomDelays[Number(id) % randomDelays.length]);
  return Promise.resolve(databaseData[Number(id)]);
};

const userPut = async (user: User) => {
  console.log('Put: ', user);
  return Promise.resolve();
};

// Types

type UserId = string;

interface UserIdsResult {
  userIds: UserId[]
  count: number
}

type SourceDBUserIdsGet = () => Promise<UserIdsResult>;

interface User {
  id: UserId
  email: string
  balance: number
}

type SourceDBUserGet = (id: UserId) => Promise<User>;
type TargetDBUserPut = (user: User) => Promise<void>;

interface Dependencies {
  userIdsGet: SourceDBUserIdsGet
  userGet: SourceDBUserGet
  userPut: TargetDBUserPut
}

type SyncUsers = (dependencies: Dependencies) => Promise<void>;

// Main

const dependencies = {
  userIdsGet,
  userGet,
  userPut,
};

const syncUsers: SyncUsers = async (dependencies: Dependencies) => {
  // Your implementation here
};

(async () => {
  console.time('syncUsers');
  await syncUsers(dependencies);
  console.timeEnd('syncUsers');
})();
