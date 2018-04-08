let instance = null

export default () => {
  if (instance === null){
    instance = new ReactiveVar("ROSTERME_SESSION")
  }
  return instance
}