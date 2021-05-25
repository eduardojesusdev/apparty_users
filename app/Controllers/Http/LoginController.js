'use strict'

class LoginController {
  async login ({request, response, auth}){
    try {
      const {email, password} = request.all()
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      response.status(400).send({erro: error})
    }
  }
}

module.exports = LoginController
