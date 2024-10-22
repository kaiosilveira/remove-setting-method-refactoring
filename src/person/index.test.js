import { Person } from './index';

describe('Person', () => {
  it('should allow to configure a name', () => {
    const person = new Person();
    person.name = 'John Doe';
    expect(person.name).toEqual('John Doe');
  });

  it('should allow to configure an id', () => {
    const person = new Person();
    person.id = 123;
    expect(person.id).toEqual(123);
  });
});
