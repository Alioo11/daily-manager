export const findSat = ()=>{
    const now = new Date()
    const goBackinTime = (date , amount)=>{
        return new Date(now.getTime()-1000*60*60*24*(amount+1))
    }
    return goBackinTime(now , now.getDay())
}