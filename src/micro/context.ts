import MicroApp from "@btc/micro";
import React from "react";

// export const MicroContext = React.createContext();

let microInstance:MicroApp;

function setMicro(instance:MicroApp){
    microInstance = instance
}

export function getMicro(){
    return microInstance;
}

export const initReactMicro = {
    type: '3rdParty',
  
    init(instance:MicroApp) {
    //   setDefaults(instance.options.react);
      setMicro(instance);
    },
  };
  