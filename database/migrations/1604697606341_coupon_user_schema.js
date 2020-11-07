'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CouponUserSchema extends Schema {
  up() {
    this.create('coupon_user', table => {
      table.increments();
      table.integer('user_id').unsigned();
      table.integer('coupon_id').unsigned();
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .foreign('coupon_id')
        .references('id')
        .inTable('coupons')
        .onDelete('cascade');

      table.timestamps();
    });
  }

  down() {
    this.drop('coupon_user');
  }
}

module.exports = CouponUserSchema;
