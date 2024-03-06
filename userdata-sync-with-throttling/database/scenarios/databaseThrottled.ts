import { isEqual } from 'lodash';
import { User, UserId } from '../../types';
import databaseData from '../databaseData';

// eslint-disable-next-line max-len
const randomDelays = [200, 492, 242, 91, 246, 499, 113, 463, 401, 139, 38, 151, 156, 42, 168, 295, 166, 25, 3441, 1359];

export const userIdsGet = async () => Promise.resolve({
  userIds: databaseData.map((user) => user.id),
  count: databaseData.length,
});
const sleep = async (timeout) => new Promise((r) => setTimeout(r, timeout));

const maxGetRequestsPerSecond = 10;
const recentRequests = new Set();

export const userGet = async (id: UserId) => {
  if (recentRequests.size > maxGetRequestsPerSecond) {
    return Promise.reject(new Error('Too many requests'));
  }

  recentRequests.add(id);
  setTimeout(() => { recentRequests.delete(id); }, 1000);

  await sleep(randomDelays[Number(id) % randomDelays.length]);
  return Promise.resolve(databaseData[id]);
};

const localDatabase = [];

export const userPut = async (user: User) => {
  console.log('Put user: ', user);
  localDatabase.push(user);
  return Promise.resolve();
};

export const isDatabaseComplete = () => {
  const sortedSource = databaseData.sort((item1, item2) => (item1.id > item2.id ? -1 : 1));
  const sortedTarget = localDatabase.sort((item1, item2) => (item1.id > item2.id ? -1 : 1));
  return isEqual(sortedSource, sortedTarget);
};
