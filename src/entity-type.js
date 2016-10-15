import uuid from 'uuid'

export const Types = {
  string: 'prop_text',
  number: 'prop_int',
  dateTime: 'prop_datetime',
  float: 'prop_float',
  long: 'prop_long'
}

class EntityType {
  constructor(type, schema, id=undefined) {
    this.type = type
    this.schema = schema
    this.data = {}
    this.id = id || uuid.v4()
  }

  getIndexes() {
    return Object.keys(this.schema)
    .filter((p) => (
      this.schema[p].index === true
    )).map((p) => {
      const value = this.getProperty(p)
      return {
        propKey: p,
        propValue: value,
        ...this.schema[p]
      }
    })
  }

  getId() {
    return this.id
  }

  setProperty(prop, value) {
    this.data[prop] = value
  }

  getProperty(prop) {
    return this.data[prop]
  }
}

export default EntityType
