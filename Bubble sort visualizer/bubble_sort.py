import eel
eel.init('web')
sorting = True


@eel.expose
def reset_array():
    global sorting
    sorting = False


@eel.expose
def bubble_sort(data: list) -> any:
    global sorting
    sorting = True
    length: int = len(data)
    for i in range(length):
        for j in range(length-i-1):
            if not sorting:
                # print(sorting)
                return
            if data[j] > data[j+1]:
                data[j], data[j+1] = data[j+1], data[j]
                eel.show_step(data, [j, j+1])
                eel.sleep(0.2)
    return data


try:
    print("starting app at PORT 8080")
    eel.start('index.html', mode=None, host='0.0.0.0', port=8080)
except Exception as e:
    print(f"Error starting Eel: {e}")
