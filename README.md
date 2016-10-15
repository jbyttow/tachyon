# tachyon
TachyonDB schemaless, asynchronous data modeling library. *Disclaimer: not production tested, or spec complete!*

## introduction
TachyonDB provides a schemaless interface for building and manipulating object models on top of relational databases.

## interface
### defining a model
```javascript
const UserEntity = new EntityType('User', {
  canonicalEmail: { type: Types.string, index: true },
  firstName: { type: Types.string },
  lastName: { type: Types.string },
  genderPreference: { type: Types.number },
  createdAt: { type: Types.dateTime, index: true}
})
```

### inserting a model
```javascript
const newUser = UserEntity
  user.setProperty(
    'canonicalEmail',
    'jasonbyttow@gmail.com'
  )
  insertEntity((newUser)
  .then((user) => {
    console.log(`user ${user.getProperty('canonicalEmail')} added`)
  })
 ```
 
### retrieving a model
 ```javascript
 getEntityByKeyValue(
   UserEntity.type,
   UserEntity.schema.canonicalEmail.type,
   'canonicalEmail',
   'jasonbyttow@gmail.com'
)
.then((user) => {
  if (user) {
    console.log(`user ${user.getProperty('canonicalEmail')} retrieved`)
  }
})
```
