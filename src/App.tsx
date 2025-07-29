import styles from './app.module.scss'
import TodoList from './components/todo-list/Todo-List'

function App() {
	return (
		<div className={styles.app}>
			<TodoList></TodoList>
		</div>
	)
}

export default App
