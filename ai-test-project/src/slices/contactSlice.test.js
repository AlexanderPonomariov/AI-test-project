import reducer, { setField, submitData, cleanData } from './contactSlice';

describe('contactSlice', () => {
  // Test initial state
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      submittedData: {},
    });
  });

  // Test setting a field
  it('should handle setField', () => {
    const nextState = reducer({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      submittedData: {},
    }, setField({ name: 'firstName', value: 'John' }));

    expect(nextState).toEqual({
      firstName: 'John',
      lastName: '',
      email: '',
      message: '',
      submittedData: {},
    });
  });

  // Test submitting the data
  it('should handle submitData', () => {
    const nextState = reducer({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'Hello there!',
      submittedData: {},
    }, submitData());

    expect(nextState).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'Hello there!',
      submittedData: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        message: 'Hello there!',
      },
    });
  });

  // Test cleaning the submitted data
  it('should handle cleanData', () => {
    const nextState = reducer({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'Hello there!',
      submittedData: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        message: 'Hello there!',
      },
    }, cleanData());

    expect(nextState).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'Hello there!',
      submittedData: {},
    });
  });
});
