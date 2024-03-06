import {
  userGet, userIdsGet, userPut, isDatabaseComplete,
} from './database/scenarios/databaseThrottled';
import syncUsers from './syncUsers';

const dependencies = {
  userIdsGet,
  userGet,
  userPut,
};

(async () => {
  console.time();

  await syncUsers(dependencies);

  console.log(`Database synchronisation was successful: ${isDatabaseComplete()}`);

  console.timeEnd();
})();
