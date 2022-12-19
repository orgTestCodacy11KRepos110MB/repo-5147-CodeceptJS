const expect = require('expect');

const { Assertion } = require('../../../lib/assert/empty');
const AssertionError = require('../../../lib/assert/error');

let empty;

describe('empty assertion', () => {
  beforeEach(() => {
    empty = new Assertion({ subject: 'web page' });
  });

  it('should check for something to be empty', () => {
    empty.assert(null);
    expect(() => empty.negate(null)).toThrow(AssertionError);
  });

  it('should check for something not to be empty', () => {
    empty.negate('something');
    expect(() => empty.assert('something')).toThrow(AssertionError);
  });

  it('should provide nice assert error message', () => {
    empty.params.value = '/nothing';
    const err = empty.getFailedAssertion();
    expect(err.inspect()).toEqual("expected web page '/nothing' to be empty");
  });

  it('should provide nice negate error message', () => {
    empty.params.value = '/nothing';
    const err = empty.getFailedNegation();
    expect(err.inspect()).toEqual("expected web page '/nothing' not to be empty");
  });
});
