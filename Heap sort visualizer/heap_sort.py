import random
data = random.sample(range(1, 100), 10)


def heapify(arr, size, root):
    largest = root
    left = root*2+1
    right = root*2+2
    if left < size and arr[left] > arr[largest]:
        largest = left

    if right < size and arr[right] > arr[largest]:
        largest = right

    if largest != root:
        arr[largest], arr[root] = arr[root], arr[largest]
        # heapify the current non - root (previously root) element till either a smaller element is found or reached end
        heapify(arr, size, largest)


def heap_sort(arr):
    size = len(data)
    for i in range(size//2, -1, -1):
        heapify(arr, size, i)

    for i in range(size-1, -1, -1):
        # largest element at start will be swapped with element at i th index as in to remove from heapify process
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)


print("Before sorting", data)
heap_sort(data)
print("After sorting", data)
