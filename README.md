# tachyon
TachyonDB schemaless, asynchronous data modeling library. *Disclaimer: not production tested, or spec complete!*

## introduction
TachyonDB provides a schemaless interface for building and manipulating object models on top of relational databases.

## interface 
### defining a model
```
const User = new EntityType('User', {
  canonicalEmail: { type: Types.string, index: true },
  firstName: { type: Types.string },
  lastName: { type: Types.string },
  genderPreference: { type: Types.number },
  createdAt: { type: Types.dateTime, index: true}
})
```
