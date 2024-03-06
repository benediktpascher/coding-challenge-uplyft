import { times } from 'lodash';

export default times(1000, (i) => ({
  id: `${i}`,
  email: `user${i}@email.com`,
  balance: i,
}));
