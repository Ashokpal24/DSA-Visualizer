# data = [6, 5, 12, 10, 9, 11]
data = [9, 20, 30, 1, 100, -1]


# step 1 - check if length of subarray is greater than 1
# step 2 - divide the subarray further
# step 3 - compare elements between sorted subarrays and add then to main sub array (smallest come first)
# step 4 - place remaining element after comparision is finished (incase elements remain in larger subarray)
# Note - all steps happen to a copy of main array and then data is place in main array (nothing is return)


def merge_sort(arr) -> None:
    if len(arr) <= 1:
        return

    # divide
    mid = len(arr)//2
    subarrA = arr[:mid]
    subarrB = arr[mid:]

    merge_sort(subarrA)
    merge_sort(subarrB)

    i = j = k = 0
    # conquer
    # check element between each sorted subarrays and add element in main subarray in sorted fashion
    while i < len(subarrA) and j < len(subarrB):
        if subarrA[i] < subarrB[j]:
            arr[k] = subarrA[i]
            i += 1
        else:
            arr[k] = subarrB[j]
            j += 1
        k += 1

    # once index in smallest subarray is reached add remaining to main subarray
    while i < len(subarrA):
        arr[k] = subarrA[i]
        i += 1
        k += 1

    while j < len(subarrB):
        arr[k] = subarrB[j]
        j += 1
        k += 1


print("Before sorting: ", data)
merge_sort(data)
print("After sorting: ", data)
