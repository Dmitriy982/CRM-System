import React from 'react'
import styles from './Navigation.module.scss'
import type { status } from '../../API/API'

interface INavigation {
	handleProgressClick: (event: React.MouseEvent<HTMLElement>) => void
	amount: Record<status, number>
	isHideCategory: Record<status, boolean>
}

function Navigation({
	isHideCategory,
	handleProgressClick,
	amount,
}: INavigation) {
	return (
		<nav className={styles.myNavigation} onClick={handleProgressClick}>
			<button
				disabled={!isHideCategory['all']}
				data-id='all'
				className={
					isHideCategory['all'] ? styles.myCategoryNotActive : styles.myCategory
				}
			>
				Все {amount.all}
			</button>
			<button
				disabled={!isHideCategory['inWork']}
				data-id='inWork'
				className={
					isHideCategory['inWork']
						? styles.myCategoryNotActive
						: styles.myCategory
				}
			>
				В работе {amount.inWork}
			</button>
			<button
				disabled={!isHideCategory['completed']}
				data-id='completed'
				className={
					isHideCategory['completed']
						? styles.myCategoryNotActive
						: styles.myCategory
				}
			>
				Сделано {amount.completed}
			</button>
		</nav>
	)
}

export default Navigation
