export function getNextSevenDays(): string[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const next7Days = [];
  for (let i = 0; i < 7; i++) {
    next7Days.push(days[new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).getDay()]);
  }
  return next7Days;
}
function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes: any = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
export function timeStampToDate(timeStamp: number){
  var date = new Date(timeStamp * 1000);
  return {
    dateStr: date.toLocaleDateString(),
    timeStr: formatAMPM(date)
  }
}