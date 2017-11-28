def bubble_sort(arr):
    for i in range(len(arr)-1, 0, -1):
        for x in range(i):
            if arr[x] > arr[x+1]:
                arr[x], arr[x+1] = arr[x+1], arr[x]
    return arr

test = [3,-1,5,9,0,4,4,2,10]
print bubble_sort(test)