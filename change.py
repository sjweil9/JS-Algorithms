us_currency = ["Dollar", 100, "Half Dollar", 50, "Quarter", 25, "Dime", 10, "Nickel", 5, "Penny", 1]
euro = ["2 Euro", 200, "1 Euro", 100, "50 Euro Cent", 50, "20 Euro Cent", 20, "10 Euro Cent", 10, "5 Euro Cent", 5, "2 Euro Cent", 2, "1 Euro Cent", 1]

def make_change(cents, currency):
    coins = {}
    limit = len(currency)
    for x in range(0, limit, 2):
        num_coins = int(cents / currency[x+1])
        coins[currency[x]] = num_coins
        cents -= num_coins * currency[x+1]
    return coins

print make_change(387, us_currency)
print make_change(387, euro)