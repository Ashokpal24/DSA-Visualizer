data = [8, 7, 2, 1, 0, 9, 6]


def partition(arr, low, high):
    if low < high:
        i = low-1  # second pointer
        for j in range(low, high):
            # if element less than pivot is found
            # swap element at j with second pointer position
            if arr[j] <= arr[high]:  # last element as pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
            # finally swap pivot with current second pointer position
        arr[i+1], arr[high] = arr[high], arr[i+1]
        return i+1


def quick_sort(arr, low, high):
    if low < high:
        # get pivot pointer
        pivot = partition(arr, low, high)
        # sub divide subarray using pivot index as mid point
        quick_sort(arr, low, pivot-1)
        quick_sort(arr, pivot+1, high)


print("Before Swapping: ", data)
quick_sort(data, 0, len(data)-1)
print("After Swapping: ", data)
