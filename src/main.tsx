import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/global.scss'
import { BrowserRouter } from 'react-router-dom'
import { setupStore } from './modules/store/store.ts'
import { Provider } from 'react-redux'

export const store = setupStore()

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
