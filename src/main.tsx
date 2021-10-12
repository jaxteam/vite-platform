import { MicroApp } from '@btc/micro'
import { routes } from './router'
import { createHashHistory } from 'history'
import "./app.css"


const app = new MicroApp({
  routes,
  history: createHashHistory()
}).render(document.getElementById("root")||document.body)

app.push("/list")


// export default App