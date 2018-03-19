//@flow
import React from 'react'

//匯入Props靜態類型的定義
import type { TodoEditProps } from '../definitions/TodoTypeDefinition.js'

const TodoEditForm = ({ title, onItemUpdate }: TodoEditProps) => {

  //給Flow檢查用的，這個參照值一開始都是null，渲染前是不確定值，所以用any
  let titleField: any = null

  return (
    <li className="list-group-item">
      <input 
        type="text"
        defaultValue = {title}
        ref={el => { titleField = el }}
        // placeholder={placeholderText}
        autofocus
        onKeyPress={(e) => {
          if (titleField.value.trim() 
              && e.target instanceof HTMLInputElement 
              && e.key === 'Enter') {  
                onItemUpdate(titleField.value);
          }
        }
      }
        onblur = {(e) => {
          if (titleField.value.trim() 
              && e.target instanceof HTMLInputElement) {  
            //更新標題    
            onItemUpdate(titleField.value)
          }
        }
      }
    
        
      
      />
    </li>
  )
}

//匯出TodoAddForm模組
export default TodoEditForm