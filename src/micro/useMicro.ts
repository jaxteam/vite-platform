import { getMicro } from "./context"

// const useMicro=function(){
//    const micro = getMicro()
//    return {micro}
// }

const useHistory=function(){
    // const micro = getMicro()
    // return micro.getHistory()
}



const useNavigation=function(){
    const micro = getMicro()
    const ret = {
        navigatorURL:micro.push,
        naviagtorName:function(name:string){
            const url = micro.findURL(name)
            micro.push(url)
        },
        viewPath:function(name:string,params?:any){
            // micro.history
            return ['/#',micro.findURL(name,params)].join("")
        }
    } 
    return ret
}

export {useHistory,useNavigation}