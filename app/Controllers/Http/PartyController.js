'use strict'

const Party = use('App/Models/Party')
const Database = use('Database')
const { validate } = use('Validator')
const Env = use('Env')

class PartyController {

  async show({request, response}){

    let page = request.get().page
    if (!page || page == 0) page = 1

    try {
      const parties = await Party
      .query()
      .paginate(page, Env.get('PER_PAGE'))

      response
      .status(200)
      .send({
        parties
      })
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async now({request, response}){

    let page = request.get().page
    if (!page || page == 0) page = 1

    try {
      const parties = await Party
      .query('date_init', '>=', Date.now())
      .paginate(page, Env.get('PER_PAGE'))

      response
      .status(200)
      .send({
        parties
      })
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async nextHour({request, response}){

    let page = request.get().page
    if (!page || page == 0) page = 1

    try {
      const parties = await Party
      .query('date_init', '>=', Date.now() + 2)
      .paginate(page, Env.get('PER_PAGE'))

      response
      .status(200)
      .send({
        parties
      })
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async tematics({request, response}){

    let page = request.get().page
    if (!page || page == 0) page = 1

    try {
      const parties = await Party
      .query('theme', '!=', null)
      .paginate(page, Env.get('PER_PAGE'))

      response
      .status(200)
      .send({
        parties
      })
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async single({request, response}){
    try {
      const slug = request.params.party_slug
      const single = await Party.query().where('party_slug', slug).fetch()

      response
      .status(200)
      .send({
        single
      })
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async search({request, response}){
    try {

      let query = request.input('query')

      console.log(query)

      let parties = await Party
      .query()
      .where('name', 'like', '%' + query + '%')
      .orWhere('description', 'like', '%' + query + '%')
      .orWhere('type_event', 'like', '%' + query + '%')
      .orWhere('theme', 'like', '%' + query + '%')
      .fetch()

      response
      .status(200)
      .send({
        parties
      })
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }

  async triggerPresence({request, response, auth}){
    var user_id = auth.user.id
    const slug = request.params.party_slug
    const party = await Party.findByOrFail('party_slug', slug)

    var message = ''

    party.presences = JSON.parse(party.presences)

    var user_in = false


    function removerPela(chave, valor){
      party.presences.users = party.presences.users.filter(function(jsonObject) {
          return jsonObject[chave] != valor;
      });
      return party.presences.users
    }

    for (var i = 0; i < party.presences.users.length; i++){
      if (party.presences.users[i].user_id == auth.user.id){
        party.presences.users = removerPela("user_id", user_id)
        message = 'Presença cancelada!'
        user_in = true
      }
    }

    if (!user_in) {
      let json = party.presences.users
      json = {"user_id": user_id, "user_name": auth.user.name}
      party.presences.users.push(json)
      party.presences = JSON.stringify(party.presences)
      message = 'Presença confirmada!'
    }else{
      party.presences = JSON.stringify(party.presences)
    }

    try {
      await party.save()

      response.status(200).send({
        message: message
      })
    } catch (error) {
      response
      .status(400)
      .send({
        message: error.message
      })
    }
  }
}

module.exports = PartyController
