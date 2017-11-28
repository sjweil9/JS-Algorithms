def push_front(arr, val):
    arr.append(val)
    for i in range(len(arr)-1, 0, -1):
        arr[i-1], arr[i] = arr[i], arr[i-1]
    return arr

test = [1,2,3,4]
print push_front(test, 5)