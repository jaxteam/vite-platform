import { MicroApp } from '@btc/micro/lib'
import { routes } from './router'
import { createHashHistory } from 'history'



const App = new MicroApp({
  routes,
  history: createHashHistory()
}).
render(document.getElementById("root")||document.body)

export default App
