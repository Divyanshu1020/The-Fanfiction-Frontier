import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import Routes from './routes/Routes.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Routes/>
  </Provider>
)
