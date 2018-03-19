//@flow
import React from 'react'
import TodoSearchFormProps from '../definitions/TodoTypeDefinition'

// Chrome v55

// onComposition:  compositionstart
// onComposition:  compositionupdate
// onChange: change
// onComposition:  compositionupdate
// onChange: change
// onComposition:  compositionupdate
// onChange: change
// onComposition:  compositionupdate
// onChange: change
// onComposition:  compositionend

function TodoSearchForm({ placeholderText, onItemSearch }: TodoSearchFormProps){
  let titleField:any = null;
  let isOnComposition :boolean = false;
  const isChrome = !!window.chrome && !!window.chrome.webstore
  
  function handleComposition(e:KeyboardEvent) {
    if(e.type === 'compositionend'){
      isOnComposition = false;

      //修正Chrome v53之後的事件觸發順序問題
      //https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
      if (e.target instanceof HTMLInputElement && !isOnComposition && isChrome) {  
        //進行搜尋         
        onItemSearch(titleField.value)
     } 

    }else{
      isOnComposition = true;
    }
  }

  return(
      <div>
        <input
        className="form-control"
        type="text"
        ref= {el => {titleField = el}}
        placeholder = {placeholderText}
        onCompositionStart={handleComposition} 
        onCompositionUpdate={handleComposition} 
        onCompositionEnd={handleComposition} 
        onChange={(e: KeyboardEvent) => {
            //只有onComposition===false，才作onChange
            if (e.target instanceof HTMLInputElement && !isOnComposition) {  
               //進行搜尋            
              onItemSearch(titleField.value)
            } 
        }}
        
        
        />

      </div>
  )
}

export default TodoSearchForm