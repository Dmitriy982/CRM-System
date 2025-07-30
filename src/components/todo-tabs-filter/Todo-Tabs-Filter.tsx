import { type Dispatch, type SetStateAction } from 'react'
import styles from './Todo-Tabs-Filter.module.scss'
import type { CategorySelector } from '../../types/types'

interface TodoTabsFilterProps {
  amount: Record<CategorySelector, number>
  category: CategorySelector
  setCategory: Dispatch<SetStateAction<CategorySelector>>
  getTodos: (category: CategorySelector) => void
}

function TodoTabsFilter({
  category,
  amount,
  getTodos,
  setCategory,
}: TodoTabsFilterProps) {
  // const handleProgressClick = (e: React.MouseEvent<HTMLElement>) => {
  // 		const childElement = e.target as HTMLElement
  // 		const child = childElement.closest<HTMLElement>('[data-id]')
  // 		if (!child) {
  // 			return}
  // 		//const childId = child.getAttribute('data-id') as CategorySelector
  // 		const childId = child.dataset.id as CategorySelector
  // 		setCategory(childId)
  // 		getTodos(childId)
  // 	}

  const handleChangeTab = (category: CategorySelector) => {
    setCategory(category)
    getTodos(category)
  }
  return (
    <nav className={styles.myNavigation}>
      <button
        disabled={category === 'all'}
        data-id='all'
        onClick={() => handleChangeTab('all')}
        className={
          category === 'all' ? styles.myCategory : styles.myCategoryNotActive
        }
      >
        Все {amount.all}
      </button>
      <button
        disabled={category === 'inWork'}
        data-id='inWork'
        onClick={() => handleChangeTab('inWork')}
        className={
          category === 'inWork' ? styles.myCategory : styles.myCategoryNotActive
        }
      >
        В работе {amount.inWork}
      </button>
      <button
        disabled={category === 'completed'}
        data-id='completed'
        onClick={() => handleChangeTab('completed')}
        className={
          category === 'completed'
            ? styles.myCategory
            : styles.myCategoryNotActive
        }
      >
        Сделано {amount.completed}
      </button>
    </nav>
  )
}

export default TodoTabsFilter
