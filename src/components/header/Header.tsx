import styles from './Header.module.scss'

interface IHeader {
	handleSubmit: () => void
	myInput: any
	setMyInput: (event: string) => void
}

function Header({ handleSubmit, myInput, setMyInput }: IHeader) {
	return (
		<header className={styles.myHeader}>
			<input
				type='text'
				id='input'
				value={myInput}
				onChange={(event) => setMyInput(event.target.value)}
				placeholder='Task To Be Done...'
				style={{ width: '100%' }}
				className={styles.myInput}
			></input>
			<button className={styles.myButton} onClick={handleSubmit}>
				add
			</button>
		</header>
	)
}

export default Header
