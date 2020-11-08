'use strict';

const { route, group } = require('@adonisjs/framework/src/Route/Manager');

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
const Route = use('Route');

Route.group(() => {
  Route.post('register', 'AuthController.register').as('auth.register');
  Route.post('refresh', 'AuthController.refresh').as('auth.refresh');
  Route.post('login', 'AuthController.login').as('auth.login');
  Route.post('logout', 'AuthController.logout').as('auth.logout');

  Route.post('reset-password', 'AuthController.forgot').as('auth.forgot');
  Route.get('reset-password', 'AuthController.remember').as('auth.remember');
  Route.put('reset-password', 'AuthController.reset').as('auth.reset');
})
  .prefix('v1/auth')
  .namespace('Auth');
