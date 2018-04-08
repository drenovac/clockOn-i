import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
      username: 'admin',
      email: 'martin.drenovac@powerforcesoftware.com',
      password: 'MeteorLovesReact'
    })
  }
  Accounts.config({
    forbidClientAccountCreation : true
  })
})



