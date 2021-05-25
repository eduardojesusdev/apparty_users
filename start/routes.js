'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
/** @type {import('@adonisjs/framework/src/Env')} */

const Route = use('Route')
const Env = use('Env')

//start guest
Route.group(() => {
  Route.get('/', () => {
    return {
      api_version: Env.get('API_VERSION'),
      application_name: Env.get('APP_NAME')
    }
  })

  Route.post('/signup', 'SignUpController.store')
  Route.post('/login', 'LoginController.login')
  Route.post('/forgot-password', 'forgotController.forgot')
})
//end guest

//start user
Route.group(() => {
  Route.get('/', 'PartyController.show')
  Route.post('/{slug}', 'PartyController.single')
  Route.post('/{slug}/presence', 'PartyController.triggerPresence')
}).prefix('dashboard').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'UserController.show')
  Route.post('/edit', 'UserController.edit')
  Route.post('/delete', 'UserController.delete')
}).prefix('dashboard/profile').middleware(['auth'])
//end user
