function validateTitle(title: string): string | null {
  if (!title) {
    return 'Это поле не может быть пустым!'
  }
  if (title.length < 2) {
    return 'Минимальная длина текста 2 символа!'
  }
  if (title.length > 64) {
    return 'Максимальная длина текста 64 символа!'
  }
  if (!title.trim()) {
    return 'Задача не должна быть пустая!'
  }
  return null
}

export default validateTitle
