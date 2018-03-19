//@flow

export type Item = {
  id: number,
  title: string, 
  isCompleted: boolean,
  isEditing: boolean,
}

export type SortType = '' | 'asc' | 'desc'

export type TodoListProps = {
  children?: React$Element<*>,
  onItemFilter:Function,
  onItemSort:(x: SortType) => void, 
  sortType:string,
}

export type TodoItemProps = { 
  title: string,
  style: Object,
  isCompleted:boolean,
  onItemClick: Function,
  onItemDoubleClick: Function,
}

export type TodoAddFormProps = {
  placeholderText: string,
  onItemAdd: (x: Item) => void,
}

export type TodoEditProps = {
  title:string,
  onItemUpdate: (x: string) => void,
}

export type TodoSearchFormProps = {
  placeholderText:string,
  onItemSearch:Function,
}

