Meteor.publish("timeCards", (timeCardIds = [], employee = '') => {
  return TimeEntries.find({employee: employee, 'timeCard.id' : {'$in': timeCardIds}})
})

Meteor.publish("AdminEntries", function() {
  if (this.userId){
    return TimeEntries.find()
  }else{
    return this.ready()
  }
})

Meteor.publish("Companies", () => {
  return Companies.find()
})