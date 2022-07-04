export function debounce(fnuc,delay){
      let timer=null;
      return function(...args){
        if(timer){
          clearTimeout(timer)
        }
        timer=setTimeout(()=>{
          fnuc.apply(this,args)
        },delay)
      }
}




