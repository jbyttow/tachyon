import Promise from 'bluebird'
import Knex from 'knex'

import { createEntityStoreIfNotExists } from './entity-table-generator'

let knex = undefined

export const connectDatabase = (config) => {
  return new Promise((resolve, reject) => {
    knex = Knex({
      client: config.client,
      connection: {
        host: config.host,
        user: config.user,
        database: config.name
      },
      pool: {
        min: config.poolMin,
        max: config.poolMax
      }
    })
    createEntityStoreIfNotExists().then(() => resolve(knex))
  })
}

export const getConnection = () => {
  return knex
}
