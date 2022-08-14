export const imgError={
    // 当被绑定的元素插入到DOM 中时
    inserted(el,{value}){
      if(!el.src){
          el.src=value
      }else{
        el.onerror=function(){
          el.src=value
        }
      }
    },
    update(el,{value}) {
      if(!el.src){
        el.src=value
      }else{
        el.onerror=function(){
          el.src=value
        }
      }
    }
}