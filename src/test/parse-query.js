import { describe } from 'riteway';
import { parseQuery } from '../parse-query';
import deepFreeze from 'deep-freeze';

describe('parseQuery()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: parseQuery(),
    expected: []
  });

  {
    const query = deepFreeze({});
    assert({
      given: 'empty query object',
      should: 'return an empty array',
      actual: parseQuery(query),
      expected: []
    });
  }
  {
    const query = deepFreeze({ q: 'sdf', foo: 'sdf' });
    assert({
      given: 'query object with only unrelated properties',
      should: 'return an empty array',
      actual: parseQuery(query),
      expected: []
    });
  }
  {
    const query = deepFreeze({ q: 'sdf', ft: 'foo,bar,baz' });
    assert({
      given: 'query object with features',
      should: 'return the correct array of features',
      actual: parseQuery(query),
      expected: ['foo', 'bar', 'baz']
    });
  }
});
