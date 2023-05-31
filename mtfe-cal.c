#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <time.h>

double calculateTotalAmount();

int main() {
    double totalAmount = calculateTotalAmount();

    printf("Total Amount: %.2lf\n", totalAmount);

    return 0;
}

double calculateTotalAmount() {
    int mainAmount;
    char startDateStr[11];
    char endDateStr[11];

    // Get input values
    printf("Main Amount: ");
    scanf("%d", &mainAmount);
    printf("Start Date (YYYY-MM-DD): ");
    scanf("%s", startDateStr);
    printf("End Date (YYYY-MM-DD): ");
    scanf("%s", endDateStr);

    // Convert date strings to time_t
    struct tm start_tm, end_tm;
    memset(&start_tm, 0, sizeof(struct tm));
    memset(&end_tm, 0, sizeof(struct tm));

    strptime(startDateStr, "%Y-%m-%d", &start_tm);
    strptime(endDateStr, "%Y-%m-%d", &end_tm);

    time_t startDate = mktime(&start_tm);
    time_t endDate = mktime(&end_tm);

    // Calculate date range in days
    double dateRange = difftime(endDate, startDate) / (60 * 60 * 24);
    double calRange = (dateRange * 2) / 3;

    // Check main amount level
    double profitPerDay;
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
        printf("Invalid main amount\n");
        return 0;
    }

    // Calculate total amount
    double totalAmount = mainAmount;
    double allocatedDateRange = calRange;

    while (allocatedDateRange > 0) {
        totalAmount += profitPerDay;
        allocatedDateRange--;
    }

    return totalAmount;
}
