def insertion_sort(arr):
    limit = len(arr)
    for i in range(1, limit):
        temp = arr[i]
        k = i
        # save temp at current index, shift everything forward until you find spot
        # where temp value fits, then insert
        while k > 0 and arr[k-1] > temp:
            arr[k], arr[k-1] = arr[k-1], arr[k]
            k -= 1
        arr[k] = temp
    return arr

test = [5, -1, 0, 3, 4, 9, 2, 1, 12, -6]
print insertion_sort(test)