import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppRouter from '@routes/AppRouter';
// Store and Redux
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react'

// Axios global configuration
import './services/axios-global'

// Styles
import 'antd/dist/reset.css';
import "../src/styles/style.css"





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>

    </Provider>
    {/* <BrowserRouter>
      <MainLayout />
    </BrowserRouter> */}

  </StrictMode>,
)
