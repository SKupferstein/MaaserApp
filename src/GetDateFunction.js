export function GetDate() {
  //function to get the current date
  let today = new Date();

  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  return today;
}

export function GetYear() {
  let today = new Date();

  return today.getFullYear();
}
