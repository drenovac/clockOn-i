

const getMonday = (d)  => {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  retVal = new Date(d.setDate(diff));
  retVal.setHours(0,0,0,0);
  return retVal;
}


export {getMonday}