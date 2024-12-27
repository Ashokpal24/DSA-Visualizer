# data = [6, 5, 12, 10, 9, 11]
# data = [9, 20, 30, 1, 100, -1]


# step 1 - check if length of subarray is greater than 1
# step 2 - divide the subarray further
# step 3 - compare elements between sorted subarrays and add then to main sub array (smallest come first)
# step 4 - place remaining element after comparision is finished (incase elements remain in larger subarray)
# Note - all steps happen to a copy of main array and then data is place in main array (nothing is return)

import eel
import collections
import string
import random

CHAR_POOL = string.ascii_letters + string.digits
eel.init('web')
PORT = 8080

unsolved_log = collections.defaultdict(list)
solved_log = collections.defaultdict(list)


@eel.expose()
def unsolved_data() -> dict:
    return unsolved_log


@eel.expose()
def solved_data() -> dict:
    return solved_log

@eel.expose()
def keep_alive():
    print("stayin alive..")

def generate_random_id(length=10):
    return ''.join(random.choices(CHAR_POOL, k=length))


@eel.expose()
def sorting(data):
    unsolved_log.clear()
    solved_log.clear()
    merge_sort(data)
    return data


def merge_sort(arr, depth=0, parent_id=-1) -> None:
    curr_id = generate_random_id()
    unsolved_log[depth].append((parent_id, curr_id, arr.copy()))

    if len(arr) <= 1:
        solved_log[depth].append((parent_id, curr_id, arr))
        return

    # divide
    mid = len(arr)//2
    subarrA = arr[:mid]
    subarrB = arr[mid:]

    merge_sort(subarrA, depth+1, curr_id)
    merge_sort(subarrB, depth+1, curr_id)

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

    solved_log[depth].append((parent_id, curr_id, arr))


try:
    print(f"starting app at PORT {PORT}")
    eel.start('index.html', mode=None, host='0.0.0.0', port=PORT)
except Exception as e:
    print(f"Error starting Eel: {e}")