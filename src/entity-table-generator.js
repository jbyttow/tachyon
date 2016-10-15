import { getConnection } from './index'

export const createEntityTableIfNotExists = (name) => {
  const tableName = `${name}_Properties`
  return new Promise((resolve, reject) => {
    const connection = getConnection()
    // TODO: this will not allow for reindexing (but probably a good thing right now)
    if (connection.schema.hasTable(tableName)) {
      resolve(true)
      return
    }

    connection.schema.createTableIfNotExists(tableName, (t) => {
      t.index(['entity_id', 'prop_key'])
      t.string('entity_id', 64)
      t.string('prop_key', 32)
      t.boolean('prop_bool')
      t.integer('prop_int')
      t.bigInteger('prop_long')
      t.float('prop_float')
      t.text('prop_text')
      t.dateTime('prop_datetime')
      t.timestamps()
    }).then(() => {
      resolve()
    })
  })
}

export const createEntityStoreIfNotExists = () => {
  const tableName = 'entities'
  return new Promise((resolve, reject) => {
    const connection = getConnection()
    // TODO: this will not allow for reindexing (but probably a good thing right now)
    if (connection.schema.hasTable(tableName)) {
      resolve(true)
      return
    }

    connection.schema.createTableIfNotExists(tableName, (t) => {
      t.primary(['kind', 'id'])
      t.string('kind')
      t.string('id')
      t.json('json_data')
      t.json('json_metadata')
      t.timestamps()
    }).then(() => {
      resolve()
    })
  })
}
