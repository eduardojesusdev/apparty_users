'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const Url = use('url-parse')

const db = new Url(Env.get('JAWSDB_URL'))

const db_owners = new Url(Env.get('JAWSDB_OWNERS_URL'))


module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with Mongodb databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'mysql'),
  /*-------------------------------------------------------------------------*/
  mysql: {
    client: 'mysql',
    connection: {
      host: db.hostname,
      port: db.port,
      user: db.username,
      password: db.password,
      database: db.pathname.substr(1)
    }
  },
  mysql_owners: {
    client: 'mysql',
    connection: {
      host: db_owners.hostname,
      port: db_owners.port,
      user: db_owners.username,
      password: db_owners.password,
      database: db_owners.pathname.substr(1)
    }
  }
}
