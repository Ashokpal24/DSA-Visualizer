import collections
import eel
eel.init('web')
PORT = 8080

data = [1, 3, 45, 10, 89, 90, 80, 17, 108, 1909, 121, 19]

# log = collections.defaultdict(list)
unsolved_log = collections.defaultdict(list)
solved_log = collections.defaultdict(list)


@eel.expose
def get_unsolved():
    for key in sorted(unsolved_log.keys()):
        eel.sleep(1)
        eel.addBlob(unsolved_log[key], key)


@eel.expose
def get_solved():
    for key in sorted(solved_log.keys(), reverse=True):
        eel.sleep(1)
        eel.solveBlob(solved_log[key], key)


def solve(arr, depth=0):
    # base condition
    if len(arr) == 1:
        return arr[0]
    # divide
    mid = len(arr)//2
    subarrayA = arr[:mid]
    subarrayB = arr[mid:]
    # conquer
    left = solve(subarrayA, depth+1)
    right = solve(subarrayB, depth+1)

    ans = max(left, right)
    unsolved_log[depth].append(subarrayA)
    unsolved_log[depth].append(subarrayB)
    solved_log[depth].append(left)
    solved_log[depth].append(right)

    # log[depth].append({
    #     "subarrays": (subarrayA, subarrayB),
    #     "subarray_ans": (left, right),
    #     "ans": ans
    # })
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
# print(log)
