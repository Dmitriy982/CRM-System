import { type ReactElement, type ReactNode } from 'react'
import styles from './MyButton.module.scss'

interface MyButton {
	children: ReactNode
	variant: 'primary' | 'secondary'
	information: 'warning' | 'success'
	size: 'small' | 'medium' | 'large'
	onClick: () => void 
}

function MyButton({ children, ...props }: MyButton): ReactElement {
	return (
		<button
			className={`${styles.myBtn} ${styles[`myBtn_${props.size}`]} ${styles[`myBtn_${props.variant}`]} ${styles[`myBtn_${props.information}`]}`}
			onClick={props.onClick}
		>
			{children}
		</button>
	)
}

export default MyButton
