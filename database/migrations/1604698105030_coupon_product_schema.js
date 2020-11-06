'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponProductSchema extends Schema {
  up () {
    this.create('coupon_product', (table) => {
      table.increments();
      table.integer('product_id').unsigned();
      table.integer('coupon_id').unsigned();
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('castate');
      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('castate');

      table.timestamps();
    })
  }

  down () {
    this.drop('coupon_product')
  }
}

module.exports = CouponProductSchema
