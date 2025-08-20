import { type Dispatch, type SetStateAction } from 'react'
import type {
  CategorySelector,
  TodoInfo,
} from '../../types/todos-types/todosTypes'
import { Tabs, type TabsProps } from 'antd'

interface TodoTabsFilterProps {
  amount: TodoInfo
  category: CategorySelector
  setCategory: Dispatch<SetStateAction<CategorySelector>>
}

function TodoTabsFilter({
  category,
  amount,
  setCategory,
}: TodoTabsFilterProps) {
  const handleChangeTab = (category: string) => {
    setCategory(category as CategorySelector)
  }

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `Все (${amount.all})`,
    },
    {
      key: 'inWork',
      label: `В работе (${amount.inWork})`,
    },
    {
      key: 'completed',
      label: `Сделано (${amount.completed})`,
    },
  ]

  return (
    <Tabs
      defaultActiveKey='all'
      activeKey={category}
      items={items}
      onChange={handleChangeTab}
      centered
    ></Tabs>
  )
}

export default TodoTabsFilter
