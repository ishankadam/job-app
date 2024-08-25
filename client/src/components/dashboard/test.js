const transactionArr = [
  [1, 1000, 500.0, "Vadodara", 0],
  [2, 1000, 500.0, "Mumbai", 5],
  [3, 1001, 500.0, "Mumbai", 10],
  [4, 1001, 10000.0, "Mumbai", 10],
];

const checkFradulentEntries = (arr) => {
  arr.map((row, index) => {
    if (row[2] >= 10000) {
      return index + 1;
    }
  });
};

checkFradulentEntries(transactionArr);
