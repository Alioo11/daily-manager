export const isAuth = ()=>{
    try{
        const token =  window.localStorage.getItem("TOKEN")
        return token

    }catch(error){
        console.log(error)
        return undefined
    }
}