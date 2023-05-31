      function calculateTotalAmount() {
        // Get input values
        var mainAmount = parseInt(document.getElementById("mainAmount").value);
        var startDate = new Date(document.getElementById("startDate").value);
        var endDate = new Date(document.getElementById("endDate").value);

        // Calculate date range in days
        var dateRange = Math.ceil(
          (endDate - startDate) / (1000 * 60 * 60 * 24)
        );
        var calRange = (dateRange * 2) / 3;

        // Check main amount level
        var profitPerDay;
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
          alert("Invalid main amount");
          return;
        }

        // Calculate total amount
        var totalAmount = mainAmount;
        var allocatedDateRange = calRange;

        while (allocatedDateRange > 0) {
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
        }

          mainAmount += profitPerDay;
          allocatedDateRange--;
        }

        // Display total amount
        document.getElementById("totalAmount").innerHTML =
          "Total Amount: " +
          mainAmount +
          "Selected date count: " +
          dateRange;
      }
