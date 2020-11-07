'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PasswordReset extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeCreate', async model => {
      model.token = await str_random(25);
      const expires_at = new Date();
      expires_at.setMinutes(expires_at.getMinutes() + 30)
      model.expires_at = expires_at;
    })
  }
  //Formata as datas do tipo inteiro para a string "25-10-2020 23:53:20"
  static get dates() {
    return ['crated_at', 'updated_at', 'expires_at']
  }
}

module.exports = PasswordReset
