from datetime import date,timedelta

fromdate = date(2023,5,15)
todate = date(2023,5,20)

print((todate-fromdate).days)

print((fromdate - timedelta(days=5)))