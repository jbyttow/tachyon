import Promise from 'bluebird'

import { getConnection } from './index'

const TABLE_SUFFIX = '_Properties'

const insertIndex = (entity, index) => {
  return new Promise((resolve, reject) => {
    let data = {
      prop_key: index.propKey,
      entity_id: entity.id,
    }
    data[index.type] = index.propValue
    getConnection()
      .insert(data)
      .into(`${entity.type}${TABLE_SUFFIX}`)
      .then((result) => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
  })
}

export const insertIndexes = (entity) => {
  const indexes = entity.getIndexes()
  return new Promise((resolve, reject) => {
    Promise.map(indexes, (index) => {
      return insertIndex(entity, index)
    })
    .then(() => {
      resolve()
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const getIndexes = (kind, type, key, value) => {
  let data = {
    prop_key: key
  }
  data[type] = value
  return new Promise((resolve, reject) => {
    getConnection()
    .select('entity_id')
    .from(`${kind}${TABLE_SUFFIX}`)
    .where(data)
    .then((entity_ids) => {
      resolve(entity_ids)
    })
  })
}
