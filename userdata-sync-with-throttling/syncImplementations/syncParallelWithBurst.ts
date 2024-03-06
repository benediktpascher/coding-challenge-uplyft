/* eslint-disable no-await-in-loop */
import { Dependencies, User } from '../types';

const resolvedUsers = {};

const sleep = async (timeout) => new Promise((r) => setTimeout(r, timeout));

export default async (dependencies: Dependencies) => {
  const userIdsResult = await dependencies.userIdsGet();
  for (let i = 0; i < userIdsResult.count; i += 1) {
    const userId = userIdsResult.userIds[i];
    dependencies.userGet(userId)
      .then((result) => { resolvedUsers[userId] = result; })
      .catch(() => { resolvedUsers[userId] = 'error'; });
  }

  await sleep(200);

  do {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const [key, value] of Object.entries(resolvedUsers)) {
      if (value === 'error') {
        dependencies.userGet(key)
          .then((result) => { resolvedUsers[key] = result; })
          .catch(() => { resolvedUsers[key] = 'error'; });
      }
    }
    await sleep(25);
  } while (Object.values(resolvedUsers).includes('error'));

  /* eslint-disable-next-line no-restricted-syntax */
  for (const user of Object.values(resolvedUsers)) {
    await dependencies.userPut(user as User);
  }
  return Promise.resolve();
};
