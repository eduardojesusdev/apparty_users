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
      host: Env.get('DB_HOST', db.hostname),
      port: Env.get('DB_PORT', db.port),
      user: Env.get('DB_USER', db.username),
      password: Env.get('DB_PASSWORD', db.password),
      database: Env.get('DB_DATABASE', db.pathname.substr(1))
    }
  },
  mysql_owners: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', db_owners.hostname),
      port: Env.get('DB_PORT', db_owners.port),
      user: Env.get('DB_USER', db_owners.username),
      password: Env.get('DB_PASSWORD', db_owners.password),
      database: Env.get('DB_DATABASE', db_owners.pathname.substr(1))
    }
  }
}
