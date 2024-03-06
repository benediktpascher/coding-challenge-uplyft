/* eslint-disable no-await-in-loop */
import { Dependencies } from '../types';

export default async (dependencies: Dependencies) => {
  const userIdsResult = await dependencies.userIdsGet();
  for (let i = 0; i < userIdsResult.count; i += 1) {
    const userId = userIdsResult.userIds[i];
    const user = await dependencies.userGet(userId);
    await dependencies.userPut(user);
    await new Promise((r) => setTimeout(r, 75));
  }
};
