

function validation(myInput: string | undefined) {
        if (!myInput) {
            alert('Это поле не может быть пустым!')
            return 1
        }
        if (myInput.length == 1) {
            alert('Минимальная длина текста 2 символа!')
            return 1
        }
        if (myInput.length > 64) {
            alert('Максимальная длина текста 64 символа!')
            return 1
        }
        if (!myInput.trim()) {
            alert('Задача не должна быть пустая!')
            return 1
        }
}

export default validation