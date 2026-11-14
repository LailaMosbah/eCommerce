import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppRouter from '@routes/AppRouter';
// Store and Redux
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react'

// Axios global configuration
import './services/axios-global'


//Ant Design and Styles
import { ConfigProvider } from "antd";
import { themeColors, applyThemeVariables } from "./theme/theme";
import 'antd/dist/reset.css';
import "@styles/index.css";

applyThemeVariables();




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeColors.primary,
          colorText: themeColors.textPrimary,
          colorTextSecondary: themeColors.textSecondary,
          colorBgBase: themeColors.bgMain,
          colorBgContainer: themeColors.bgCard,
          colorBorder: themeColors.border,
          borderRadius: 8,
          fontFamily: '"DM Sans", "Cairo", sans-serif',
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>

      </Provider>
      {/* <BrowserRouter>
      <MainLayout />
    </BrowserRouter> */}
    </ConfigProvider>
  </StrictMode>,
)
