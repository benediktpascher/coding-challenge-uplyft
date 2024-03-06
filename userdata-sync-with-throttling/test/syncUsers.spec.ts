import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { Dependencies } from '../types';
import syncUsers from '../syncUsers';

chai.use(sinonChai);
const { expect } = chai;

describe('syncUsers', () => {
  const userIdsGetStub = sinon.stub();
  const userGetStub = sinon.stub();
  const userPutStub = sinon.stub();

  const dependencies: Dependencies = {
    userIdsGet: userIdsGetStub,
    userGet: userGetStub,
    userPut: userPutStub,
  };

  beforeEach(() => {
    userIdsGetStub.reset();
    userGetStub.reset();
    userPutStub.reset();
  });

  describe('When there is nothing', () => {
    it('should resolve nothing', () => {
      expect(syncUsers(dependencies)).to.equal({});
    });
  });
});
