import MicroApp, { MicroRoutes } from "@btc/micro/lib/micro";
import { HashHistory } from "history";
import React, { createRef } from "react";
import { FC, useLayoutEffect, useRef } from "react";
import { initReactMicro } from "./context";

interface PMicro {
    routes: MicroRoutes
    history: HashHistory
    entry?: string
}

const Micro: FC<PMicro> = function(props: PMicro) {
    const ref = useRef<HTMLDivElement>(null)
    useLayoutEffect(function () {
        console.log("useLayout",ref)
        const app = new MicroApp({
            routes: props.routes,
            history: props.history
        }).render(ref.current||document.body)
        app.use(initReactMicro)
    },[])
    // console.info("micro init react")
    return (<div ref={ref}>121</div>)
}

export default Micro