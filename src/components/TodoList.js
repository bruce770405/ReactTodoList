//@flow
import React from 'react'
import type { TodoListProps } from '../definitions/TodoTypeDefinition.js'

const TodoList = ({children, onItemFilter, onItemSort, sortType}: TodoListProps) => {
  let sortTypeIndex: number = ['', 'asc', 'desc'].findIndex((value) => value === sortType )


  return(
  <div className="padding">
  <button
        className={(sortTypeIndex === 0)? 'btn btn-default': 'btn btn-success'}
        onClick={() => { onItemSort((sortType === 'asc')? 'desc': 'asc') }}
        disabled={(React.Children.count(children))? false: true}
      >
        按筆劃排序: {['沒有','少 -> 多','多 -> 少'][sortTypeIndex]}
      </button>
   <ul className="list-group padding">{children}</ul>
   </div>
   )
  }

export default TodoList