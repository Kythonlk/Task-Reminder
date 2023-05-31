const readline = require('readline');
const moment = require('moment');

function calculateTotalAmount() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Main Amount: ', mainAmount => {
    rl.question('Start Date (YYYY-MM-DD): ', startDate => {
      rl.question('End Date (YYYY-MM-DD): ', endDate => {
        rl.close();

        // Convert date strings to moment objects
        const startMoment = moment(startDate, 'YYYY-MM-DD');
        const endMoment = moment(endDate, 'YYYY-MM-DD');

        // Calculate date range in days
        const dateRange = endMoment.diff(startMoment, 'days');
        const calRange = (dateRange * 2) / 3;

        // Check main amount level
        let profitPerDay;
        if (mainAmount >= 26 && mainAmount <= 60) {
          profitPerDay = 0.7;
        } else if (mainAmount > 61 && mainAmount <= 200) {
          profitPerDay = 1.5;
        } else if (mainAmount > 201 && mainAmount <= 500) {
          profitPerDay = 5.5;
        } else if (mainAmount > 501 && mainAmount <= 900) {
          profitPerDay = 12;
        } else if (mainAmount > 901 && mainAmount <= 1500) {
          profitPerDay = 20;
        } else if (mainAmount > 1501 && mainAmount <= 2000) {
          profitPerDay = 35;
        } else if (mainAmount > 2001 && mainAmount <= 3500) {
          profitPerDay = 43;
        } else if (mainAmount > 3501 && mainAmount <= 4000) {
          profitPerDay = 76;
        } else if (mainAmount > 4001 && mainAmount <= 5000) {
          profitPerDay = 87;
        } else if (mainAmount > 5001 && mainAmount <= 8000) {
          profitPerDay = 127;
        } else if (mainAmount > 8001 && mainAmount <= 10000) {
          profitPerDay = 174;
        } else if (mainAmount > 10001 && mainAmount <= 12000) {
          profitPerDay = 292;
        } else if (mainAmount > 12001 && mainAmount <= 20000) {
          profitPerDay = 306;
        } else if (mainAmount > 20001 && mainAmount <= 30000) {
          profitPerDay = 600;
        } else if (mainAmount > 30001 && mainAmount <= 50000) {
          profitPerDay = 900;
        } else if (mainAmount > 50001) {
          profitPerDay = 1500;
        } else {
          console.log('Invalid main amount');
          return;
        }

        // Calculate total amount
        let totalAmount = mainAmount;
        let allocatedDateRange = calRange;

        while (allocatedDateRange > 0) {
          totalAmount += profitPerDay;
          allocatedDateRange--;
        }

        // Display total amount
        console.log(`Total Amount: ${totalAmount}`);
        console.log(`Selected date count: ${dateRange}`);
      });
    });
  });
}

calculateTotalAmount();
