def insert_sort(arr) -> None:
    for step_index in range(1, len(arr)):
        key = arr[step_index]
        left_check_index = step_index-1
        while left_check_index >= 0 and key < arr[left_check_index]:
            # shift greater values to right
            arr[left_check_index+1] = arr[left_check_index]
            left_check_index -= 1

        # after exiting while loop add key
        # left_check_index + 1 because left_check_index failed while loop condition and key should be after it.
        # i.e. left_check_index can be less than 0 or the value at left_check_index is less than the key
        arr[left_check_index+1] = key


data = [9, 5, 1, 4, 3]
print("Before sorting: ", data)
insert_sort(data)
print("After sorting: ", data)
