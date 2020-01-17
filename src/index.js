import React from 'react'
import ReactDom from 'react-dom'
import { Provider, observer } from "mobx-react"
import { createStore } from "../store"

import AppRouter from "./router"

require('../build/env')

@observer class App extends React.Component {
  constructor() {
    super()
    this.store = createStore()
  }
  render() {
    return (
      <div className="test test2">
        <Provider {...this.store}>
          <AppRouter />
        </Provider>
      </div>
    )
  }
}
ReactDom.render(<App />, document.getElementById("app"))