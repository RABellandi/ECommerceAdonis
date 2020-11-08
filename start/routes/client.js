'use strict';

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
  Route.get('products', 'ProductController.index');
  Route.get('products/:id', 'ProductController.show');

  Route.get('orders', 'OrderController.index');
  Route.get('orders/:id', 'OrderController.show');
  Route.post('orders', 'OrderController.store');
  Route.put('orders/:id', 'OrderController.put');
})
  .prefix('v1')
  .namespace('Client');
