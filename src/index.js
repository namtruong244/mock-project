import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import { Provider } from 'react-redux'
import { setupAxios } from './setup'
import { store } from './setup/redux/store'
import { ConnectedRouter as Router } from 'connected-react-router'
import { history } from './app/utils'

import './_kyn/assest/css/style.css'

setupAxios(store)

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)
