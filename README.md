[![Continuous Integration](https://github.com/kaiosilveira/remove-setting-method-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/remove-setting-method-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

---

# Remove Setting Method

<table>
<thead>
<th>Before</th>
<th>After</th>
</thead>
<tbody>
<tr>
<td>

```javascript
class Person {
  get name() {
    /* ... */
  }

  set name(aString) {
    /* ... */
  }
}
```

</td>

<td>

```javascript
class Person {
  get name() {
    /* ... */
  }
}
```

</td>
</tr>
</tbody>
</table>

Making objects immutable is a practical way of avoiding overhead (in the form of tracking changes throughout a codebase) and unintended side effects. This refactoring helps with just that.

## Working example

Our working example is a program that contains a `Person` class, which contains getters and setters for `name` and `id`. The goal here is to make id immutable after initialization. To do so, we need to remove its setter. The code looks like this:

```javascript
export class Person {
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
```

### Test suite

The test suite, as the rest of this example, is quite simple and covers the basic behavior of the `Person` class:

```javascript
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
```

With that in place, we can proceed.

### Steps

We start by introducing a construtor for `Person`, it takes an `id` as argument, and we assign it to our internal `_id` variable, via its setter:

```diff
diff --git Person...
+  constructor(id) {
+    this.id = id;
+  }
+
```

We, then, update the creation script to provide a person id via the constructor:

```diff
diff --git caller...
-const kaio = new Person();
-kaio.id = 1;
+const kaio = new Person(1);
```

And then we inline the setting method for `id` at `Person`'s constructor, effectively making the setter useless:

```diff
diff --git Person...
   constructor(id) {
-    this.id = id;
+    this._id = id;
   }
```

We can then safely [remove](https://github.com/kaiosilveira/remove-dead-code-refactoring) the `id` setter altogether:

```diff
diff --git Person...
-  set id(arg) {
-    this._id = arg;
-  }
```

And that's it!

### Commit history

Below there's the commit history for the steps detailed above.

| Commit SHA                                                                                                                   | Message                                                     |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [92b8007](https://github.com/kaiosilveira/remove-setting-method-refactoring/commit/92b80073256e8efeb364755ca0643569e35292d4) | introduce constructor for `Person`                          |
| [2051a20](https://github.com/kaiosilveira/remove-setting-method-refactoring/commit/2051a209e7fb98e5dbcdd3a8031f8c1c51d9fa40) | update creation script to provide person id via constructor |
| [d541695](https://github.com/kaiosilveira/remove-setting-method-refactoring/commit/d541695fca212f5175d56a7997dbeca9f15db35f) | inline setting method for `id` at `Person`'s constructor    |
| [b9c27b9](https://github.com/kaiosilveira/remove-setting-method-refactoring/commit/b9c27b9889f82daf92d15f256ce7172fccf43fc6) | remove `id` setter                                          |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/remove-setting-method-refactoring/commits/main).
