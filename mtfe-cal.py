import datetime

def calculate_total_amount():
    # Get input values
    main_amount = int(input("Main Amount: "))
    start_date_str = input("Start Date (YYYY-MM-DD): ")
    end_date_str = input("End Date (YYYY-MM-DD): ")

    # Convert date strings to datetime objects
    start_date = datetime.datetime.strptime(start_date_str, "%Y-%m-%d").date()
    end_date = datetime.datetime.strptime(end_date_str, "%Y-%m-%d").date()

    # Calculate date range in days
    date_range = (end_date - start_date).days
    cal_range = (date_range * 2) // 3

    # Check main amount level
    if 26 <= main_amount <= 60:
        profit_per_day = 0.7
    elif 61 <= main_amount <= 200:
        profit_per_day = 1.5
    elif 201 <= main_amount <= 500:
        profit_per_day = 5.5
    elif 501 <= main_amount <= 900:
        profit_per_day = 12
    elif 901 <= main_amount <= 1500:
        profit_per_day = 20
    elif 1501 <= main_amount <= 2000:
        profit_per_day = 35
    elif 2001 <= main_amount <= 3500:
        profit_per_day = 43
    elif 3501 <= main_amount <= 4000:
        profit_per_day = 76
    elif 4001 <= main_amount <= 5000:
        profit_per_day = 87
    elif 5001 <= main_amount <= 8000:
        profit_per_day = 127
    elif 8001 <= main_amount <= 10000:
        profit_per_day = 174
    elif 10001 <= main_amount <= 12000:
        profit_per_day = 292
    elif 12001 <= main_amount <= 20000:
        profit_per_day = 306
    elif 20001 <= main_amount <= 30000:
        profit_per_day = 600
    elif 30001 <= main_amount <= 50000:
        profit_per_day = 900
    elif main_amount > 50001:
        profit_per_day = 1500
    else:
        print("Invalid main amount")
        return

    # Calculate total amount
    total_amount = main_amount
    allocated_date_range = cal_range

    while allocated_date_range > 0:
        total_amount += profit_per_day
        allocated_date_range -= 1

    # Display total amount
    print(f"Total Amount: {total_amount}\nSelected date count: {date_range}")

calculate_total_amount()
