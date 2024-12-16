import collections
import eel
import string
import random

CHAR_POOL = string.ascii_letters + string.digits
eel.init('web')
PORT = 8080

data = [1, 3, 45, 10, 89, 90, 80, 17, 108, 1909, 121, 19]


unsolved_log = collections.defaultdict(list)
solved_log = collections.defaultdict(list)


def generate_random_id(length=10):
    return ''.join(random.choices(CHAR_POOL, k=length))


@eel.expose
def get_unsolved_all():
    return unsolved_log


@eel.expose
def get_solved_all():
    return solved_log


def solve(arr, depth=0, parent_id=-1):
    # base condition
    curr_id = generate_random_id()
    unsolved_log[depth].append((parent_id, curr_id, arr))
    if len(arr) == 1:
        solved_log[depth].append((parent_id, curr_id, arr[0]))
        return arr[0]

    # divide
    mid = len(arr)//2
    subarrayA = arr[:mid]
    subarrayB = arr[mid:]

    # conquer

    left = solve(subarrayA, depth+1, curr_id)
    right = solve(subarrayB, depth+1, curr_id)

    ans = max(left, right)

    solved_log[depth].append((parent_id, curr_id, ans))
    return ans


@eel.expose
def merge_sort(arr):
    unsolved_log.clear()
    solved_log.clear()
    ans = solve(arr)
    return ans


try:
    print(f"starting app at PORT {PORT}")
    eel.start('index.html', mode=None, host='0.0.0.0', port=PORT)
except Exception as e:
    print(f"Error starting Eel: {e}")

print(solve(data))
