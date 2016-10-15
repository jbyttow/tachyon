import uuid from 'uuid'
import Promise from 'bluebird'

import { getConnection } from './index'
import { insertIndexes, getIndexes } from './entity-indexer'
import { createEntityTableIfNotExists } from './entity-table-generator'

const normalizeEntity = (entity) => {
  entity.json_data = JSON.parse(entity.json_data)
  return { ...entity }
}

const normalizeEntities = (entities) => {
  if (typeof entities === 'object') {
      return normalizeEntity(entities)
  }
  return entities.map((e) => {
    return normalizeEntity(e)
  })
}

const _insert = (entity) => {
  const connection = getConnection()
  return new Promise((resolve, reject) => {
    connection
    .insert(entity)
    .into('entities')
    .then(() => {
      resolve(entity)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const insertEntity = (entity) => {
  const data = {
    kind: entity.type,
    id: entity.getId(),
    json_data: JSON.stringify(entity.data)
  }
  createEntityTableIfNotExists(entity.type)
  .then((result) => {
    return _insert(data)
  })
  .then((insertedEntity) => {
    return insertIndexes(entity)
  })
}

export const updateEntity = (entity) => {
  getConnection()
  .where({
    kind: entity.type,
    id: entity.getId()
  })
  .update({
    json_data: JSON.stringify(entity.data)
  })
  .then((updatedEntity) => {
    resolve(updatedEntity)
  }).catch((error) => {
    reject(error)
  })
}

export const getEntity = ({kind, id}) => {
  return new Promise((resolve, reject) => {
    getConnection()
    .select('*')
    .from('entities')
    .where({
      kind: kind,
      id: id
    })
    .first()
    .then((result) => {
      resolve(normalizeEntity(result))
    }).catch((error) => {
      reject(error)
    })
  })
}

export const getEntites = (kind, idMap) => {
  const ids = idMap.map((id) => id.entity_id)
  return new Promise((resolve, reject) => {
    getConnection()
    .select('*')
    .from('entities')
    .whereIn('id', ids)
    .then((entites) => {
      resolve(entites)
    })
  })
}

export const getEntitesByKeyValue = (kind, type, key, value) => {
  return new Promise((resolve, reject) => {
    getIndexes(kind, type, key, value)
    .then((ids) => {
      return getEntites(kind, ids)
    })
    .then((entites) => {
      resolve(entites)
    })
  })
}
