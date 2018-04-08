import moment from 'moment'

let instance = null

export default () => {
  if (instance === null){
    instance = new ReactiveDict("ROSTERME_SESSION_DICT")
    instance.set("currentWeek", moment(new Date()).subtract(0, 'w').startOf('isoweek').toString())
    instance.set("weekDiff", 0)
    instance.nextWeek = () => {
      let week = new Date(instance.get('currentWeek'))
      let weekDiff = instance.get("weekDiff")
      instance.set("currentWeek", moment(week).add(1, 'w').startOf('isoweek').toString())
      instance.set("weekDiff", weekDiff+1)
    }
    instance.prevWeek = () => {
      let week = new Date(instance.get('currentWeek'))
      let weekDiff = instance.get("weekDiff")
      instance.set("currentWeek", moment(week).subtract(1, 'w').startOf('isoweek').toString())
      instance.set("weekDiff", weekDiff-1)
    }
  }
  return instance
}