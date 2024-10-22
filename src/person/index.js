export class Person {
  constructor(id) {
    this.id = id;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get id() {
    return this._id;
  }

  set id(arg) {
    this._id = arg;
  }
}
