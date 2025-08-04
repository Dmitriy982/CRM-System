import { type Dispatch, type SetStateAction } from 'react'
import styles from './TodoTabsFilter.module.scss'
import type { CategorySelector } from '../../types/types'

interface TodoTabsFilterProps {
  amount: Record<CategorySelector, number>
  category: CategorySelector
  setCategory: Dispatch<SetStateAction<CategorySelector>>
}

function TodoTabsFilter({
  category,
  amount,
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
  }
  return (
    <nav className={styles.myNavigation}>
      <button
        disabled={category === 'all'}
        data-id='all'
        onClick={() => handleChangeTab('all')}
        className={`${styles.myCategory} ${category === 'all' && styles.myCategory_notActive}`}
      >
        Все ({amount.all})
      </button>
      <button
        disabled={category === 'inWork'}
        data-id='inWork'
        onClick={() => handleChangeTab('inWork')}
        className={`${styles.myCategory} ${category === 'inWork' && styles.myCategory_notActive}`}
      >
        В работе ({amount.inWork})
      </button>
      <button
        disabled={category === 'completed'}
        data-id='completed'
        onClick={() => handleChangeTab('completed')}
        className={`${styles.myCategory} ${category === 'completed' && styles.myCategory_notActive}`}
      >
        Сделано ({amount.completed})
      </button>
    </nav>
  )
}

export default TodoTabsFilter
