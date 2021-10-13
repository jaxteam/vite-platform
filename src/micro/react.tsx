import MicroApp, { MicroRoutes } from "@btc/micro/lib/micro";
import { HashHistory } from "history";
import { FC, useLayoutEffect, useRef } from "react";

interface PMicro {
    routes: MicroRoutes
    history: HashHistory
    entry?: string
}


const Micro: FC<PMicro> = function (props: PMicro) {
    const ref = useRef()
    useLayoutEffect(function () {
        const app = new MicroApp({
            routes: props.routes,
            history: props.history
        }).render(ref.current || document.body)
        // app.push(props.entry || "/")
    })
    return (<div ref={ref.current}></div>)
}

export default Micro