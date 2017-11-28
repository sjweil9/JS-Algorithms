def selection_sort(arr):
    limit = len(arr)
    for i in range(limit-1):
        smallest_idx = i
        for j in range(i+1, limit):
            if arr[j] < arr[smallest_idx]:
                smallest_idx = j
        if smallest_idx != i:
            arr[i], arr[smallest_idx] = arr[smallest_idx], arr[i]
    return arr

test = [5, -1, 0, 3, 4, 9, 2, 1, 12, -6]
print selection_sort(test)