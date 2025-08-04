import { type ReactElement, type ReactNode } from 'react'
import styles from './MyButton.module.scss'

interface MyButton {
  children: ReactNode
  variant: 'primary' | 'secondary' | 'warning' | 'success'
  size: 'small' | 'medium' | 'large'
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
}

function MyButton({
  children,
  type = 'button',
  ...props
}: MyButton): ReactElement {
  return (
    <button
      className={`${styles.myBtn} ${styles[`myBtn_${props.size}`]} ${styles[`myBtn_${props.variant}`]}`}
      onClick={props.onClick}
    >
      {children}
    </button>
  )
}

export default MyButton
