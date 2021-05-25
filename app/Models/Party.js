'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Party extends Model {

  static get connection() {
    return 'mysql_owners'
  }
}

module.exports = Party
