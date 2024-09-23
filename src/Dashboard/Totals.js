function total(total, num) {
  return (total += num);
}
export function GetTotal(array) {
  return array.length > 0 ? array.map((item) => item.amount).reduce(total) : 0;
}
//function used in different components to get the total of incomes / donations
