import eel
import collections
import string
import random

CHAR_POOL = string.ascii_letters + string.digits
eel.init('web')
PORT = 8080

log = collections.defaultdict(list)


@eel.expose()
def solved_data() -> dict:
    return log


@eel.expose()
def keep_alive():
    print("stayin alive..")


def generate_random_id(length=10):
    return ''.join(random.choices(CHAR_POOL, k=length))


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


def quick_sort(arr, low, high, parent_id, depth=0):
    if low < high:
        curr_id = generate_random_id()
        unsolved_arr = arr[low:high+1].copy()
        # get pivot pointer
        pivot = partition(arr, low, high)
        partial_solved_arr = arr[low:high+1].copy()
        # sub divide subarray using pivot index as mid point
        quick_sort(arr, low, pivot-1, curr_id, depth+1)
        quick_sort(arr, pivot+1, high, curr_id, depth+1)

        solved_arr = arr[low:high+1].copy()
        log[depth].append(
            {
                "parent_id": parent_id,
                "self_id": curr_id,
                "unsolved_arr": unsolved_arr,
                "partial_arr": partial_solved_arr,
                "solved_arr": solved_arr,
                "pivot_index": pivot
            })


@eel.expose()
def sorting(data):
    log.clear()
    quick_sort(data, 0, len(data)-1, -1)
    return data


try:
    print(f"starting app at PORT {PORT}")
    eel.start('index.html', mode=None, host='0.0.0.0', port=PORT)
except Exception as e:
    print(f"Error starting Eel: {e}")
