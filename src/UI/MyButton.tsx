import { type ReactElement, type ReactNode } from 'react'
import styles from './MyButton.module.scss'

interface myButton {
	children: ReactNode
	color: string
	width: string
	height: string
	onClick: () => void
}

function MyButton({ children, ...props }: myButton): ReactElement {
	return (
		<button
			className={styles.myBtn}
			style={{
				color: `${props.color}`,
				width: `${props.width}`,
				height: `${props.height}`,
			}}
			onClick={props.onClick}
		>
			{children}
		</button>
	)
}

export default MyButton
