const apiUri = 'http://203.47.127.239:9292/api/v1.1'

Meteor.methods({
  "getRosterInformation": ({sessionID}) => {
    let cookie = [sessionID]
    return new Promise((resolve, reject) => {
      HTTP.get(apiUri + "/employee/timecards?week=-4&weeks=8", {headers: {cookie: ['set-cookies', cookie]}}, (e, d) => {
        if (e) {
          reject(e)
        } else {
          resolve({statusCode: d.statusCode, content: JSON.parse(d.content)})
        }
      })
    })
  },
  "loginWithSession": ({sessionID}) => {
    let cookie = [sessionID]
    return new Promise((resolve, reject) => {
      HTTP.get(apiUri + "/login", {headers: {cookie: ['set-cookies', cookie]}}, (e, d) => {
        if (e) {
          reject(e)
        } else {
          resolve({statusCode: d.statusCode})
        }
      })
    })
  },
  "loginWithCredentials": ({username, password}) => {
    return new Promise((resolve, reject)=> {
      HTTP.post(apiUri + "/login", {data: {username: username, password: password}}, (e, d) => {
        if (e) {
          reject(e)
        } else {
          if (d.content.startsWith("404")) {
            resolve({statusCode: 404})
          } else {
            resolve({statusCode: d.statusCode, sessionID: d.headers['set-cookie'][0]})
          }

        }
      })
    })

  },
  "recordEntry": (entry) => {
    // Meteor._sleepForMs(2000)
    //TODO MODEL VALIDATION
    entry.createdAt = new Date()
    TimeEntries.insert(entry)
  }
})