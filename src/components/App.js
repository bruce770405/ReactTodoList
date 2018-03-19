//@flow
import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoItem from './TodoItem'
import TodoAddForm from './TodoAddForm'
import TodoEditForm from './TodoEditForm'
import TodoSearchForm from './TodoSearchForm'

import type { Item,SortType } from '../definitions/TodoTypeDefinition.js'


//匯入樣式
import '../style/bootstrap.css'
import '../style/animate.css'
import '../style/customer.css'

let keepSearchedItems: Array<Item> = []
let isSearching: boolean = false
let isFilteringOut: boolean = false

class App extends Component {
  // 預先定義state的結構
  state: {
    items: Array<Item>,
    sortType: SortType,
  }

  //建構式
  constructor() {
    super()

    this.state = {
      items: [],
      sortType: '',
    }
  }

  handleItemFilter = () => {

    //isFilteringOut是在這個模組的作用域變數
    isFilteringOut = !isFilteringOut

    const newItems = [...this.state.items]

     //整個陣列重新更新
     this.setState({
       items: newItems,
     })
 }

//處理其中一個陣列中成員編輯完後更新的方法
handleEditItemUpdate = (index: number, title: string) => {
  this.handleItemSort('')
  //拷貝一個新陣列
  const newItems = [...this.state.items]

  //項目的標題指定為傳入參數，更新標題
  newItems[index].title = title

  //切換isEditing的布林值
  newItems[index].isEditing = !newItems[index].isEditing

  //整個陣列重新更新
  this.setState({
    items: newItems,
  })
}

  handleItemAdd = (aItem: Item) => {
    this.handleItemSort('')

    //加入新的項目到最前面
    //此處有變動
    const newItems = [aItem, ...this.state.items ]

    //按下enter後，加到列表項目中並清空輸入框
    this.setState({
      items: newItems,
    })
  }

  //處理樣式變化其中一個陣列中成員的方法
  handleStylingItem = (index: number) => {
    this.handleItemSort('')
    //拷貝一個新陣列
    const newItems = [...this.state.items]

    //切換isCompleted的布林值
    newItems[index].isCompleted = !newItems[index].isCompleted

    //整個陣列重新更新
    this.setState({
      items: newItems,
    })
  }

  handleEditItem = (index:number) => {
    const newItems = [...this.state.items];
    newItems[index].isEditing = !newItems[index].isEditing
    this.setState(
      {item:newItems}
    )
  }

  handleItemSort =(sortType:SortType) => {
    let newItems = [...this.state.items]
    if(sortType==='asc'){
         newItems = newItems.sort((a,b) => (
             a.title.localeCompare(b.title, 'zh-Hans-TW-u-co-stroke')
         )
        )
    }
    if(sortType==='desc'){  //按筆畫多少
      newItems = newItems.sort((a,b) => (
        b.title.localeCompare(a.title, 'zh-Hans-TW-u-co-stroke')
       )
      )
    }
    this.setState({
      items: newItems,
      sortType
  })
  }


  handleSearchItem = (searchword: string) => {
    //觸發排序回復不排序
    this.handleItemSort('')
    if(!isSearching) {
      isSearching = true
      keepSearchedItems = [...this.state.items]
    }
    if(isSearching && searchword === '') {
      isSearching = false

      this.setState({
        items: keepSearchedItems,
      })

    } else {
      //過濾(搜尋)一律從原本的items資料中搜尋，也就是keepSearchedItems中的值
      const newItems  = keepSearchedItems.filter((item) => (
          item.title.includes(searchword)
      ))

      //整個陣列重新更新
      this.setState({
        items: newItems,
      })
    }
  }

  render() {
    return (
      <div className="row">
      <div className="col-md-6 col-md-offset-3">
      <div className="panel panel-warning">
         
<div className="panel-heading">
      <h3 className="panel-title">TodoApp</h3>
      </div>

       <div>
           <TodoSearchForm
           className=""
           placeholderText="請輸入關鍵字搜尋"
          onItemSearch={this.handleSearchItem}
           />
       </div>  

      <div className="panel-body">
        <TodoAddForm placeholderText="開始輸入一些文字吧" onItemAdd={this.handleItemAdd} />
        <TodoList onItemFilter={this.handleItemFilter} onItemSort={this.handleItemSort} sortType={this.state.sortType}>
        {
          this.state.items.map((item, index) => (
            (item.isEditing)
            ? <TodoEditForm
                key={item.id}
                title={item.title}
                onItemUpdate={(title) => { this.handleEditItemUpdate(index, title) }}
              />
            : <TodoItem
                key={item.id}
                isCompleted={item.isCompleted}
                title={item.title}
                onItemDoubleClick={() => { this.handleEditItem(index) }}
                onItemClick={() => { this.handleStylingItem(index) }}
              />
          )
        )
        }
        </TodoList>
        <div className="panel-footer">雙點擊項目可以進行編輯，按下Enter後儲存</div>
      </div>
     </div>
     </div>
    </div>
    )
  }
}

// 輸出App模組
export default App