TimeEntries = new Mongo.Collection("time_entries")


const TimeEntry = new SimpleSchema({
  employee: {
    type: String
  },
  customer: {
    type: String
  },
  createdAt: {
    type: Date
  },
  entryType: {
    type: Number
  },
  timeCard: {
    type: Object
  },
  'timeCard.id': {
    type: String
  },
  'timeCard.start': {
    type: String
  },
  'timeCard.end': {
    type: String
  },
  'timeCard.date': {
    type: Date
  },
  position: {type: Object},

  'position.lat': {type: String},
  'position.long': {type: String},
  'position.valid': {type: Boolean}


})


TimeEntries.attachSchema(TimeEntry)
