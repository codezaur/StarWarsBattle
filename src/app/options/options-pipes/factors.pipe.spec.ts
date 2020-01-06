import { FactorsPipe } from './factors.pipe';

describe('FactorsPipe', () => {
  it('should transform factor string into human-readable value', () => {
    const factors = new FactorsPipe();
    expect(factors.transform('films.length')).toEqual('fame');
  });
});
