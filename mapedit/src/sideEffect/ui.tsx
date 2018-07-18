import { render } from "react-dom"
import React from "react"
import { Provider } from "react-redux"
import { App } from "../component/App"

export const attachToStore = store => {
    const app = (
        <Provider store={store}>
            <App />
        </Provider>
    )

    render(app, document.getElementById("app"))
}
