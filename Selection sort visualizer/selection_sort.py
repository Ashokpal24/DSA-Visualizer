data = [20, 12, 10, 15, 2]

# step 1 - start main loop , for each step set min_index as step.
# step 2 - run a second loop inside starting from step index to end to the array.
# step 3 - if at any index value is smaller than value of current min_index , set min_index to that index.
# step 4 - if min_index is not equal to step index it means we have found a minimum value therefore swap.


def selection_sort(arr) -> None:
    for step in range(len(arr)):
        min_index = step
        for j in range(step, len(arr)):
            if arr[min_index] > arr[j]:
                min_index = j
        if min_index != step:
            arr[min_index], arr[step] = arr[step], arr[min_index]


print("Before sorting: ", data)
selection_sort(data)
print("After sorting: ", data)
