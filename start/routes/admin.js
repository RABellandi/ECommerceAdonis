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

  Route.resource('categories', 'CategoryController').apiOnly()
  Route.resource('products', 'ProductController').apiOnly()
  Route.resource('coupons', 'CouponController').apiOnly()
  Route.resource('images', 'ImageController').apiOnly()
  Route.resource('orders', 'OrderController').apiOnly()
  Route.resource('users', 'UserController').apiOnly()


}).prefix('v1/admin').namespace('Admin')

