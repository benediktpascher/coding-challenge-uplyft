import { Dependencies } from '../../types';
import LeakyBucket from './LeakyBucket';

export default async (dependencies: Dependencies) => {
  const { userIdsGet, userGet, userPut } = dependencies;

  const bucket = new LeakyBucket(10, 1000);
  const usersResult = await userIdsGet();
  const promisesInFlight = [];
  for (let i = 0; i < usersResult.count; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await bucket.makeMeWaitUntilIAmAllowedToShoot();
    promisesInFlight.push(userGet(usersResult.userIds[i]).then(userPut));
  }

  await Promise.all(promisesInFlight);
};
