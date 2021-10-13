
import MicroApp from './micro/react'
import { routes } from './router'
import { createBrowserHistory, createHashHistory} from 'history'
import { FC } from 'react'



// const App = new MicroApp({
//   routes,
//   history: createHashHistory()
// }).
// render(document.getElementById("root")||document.body)

const App:FC = function(){
  return (<MicroApp routes={routes} history={createHashHistory()} entry="/list"></MicroApp>)
}

export default App
