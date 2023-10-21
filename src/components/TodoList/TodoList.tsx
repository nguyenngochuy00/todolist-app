import { useState } from 'react'
import { Todo } from '../../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  // Truyền giá trị vào TaskList khi click edit
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const doneTodos = todos.filter(todo => todo.done)
  const notdoneTodos = todos.filter(todo => !todo.done)

  function addToDo(name: string) {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
  }

  function handleDoneTodo(id: string, done: boolean) {
    setTodos(prev => {
      return prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  // click vào nút edit, dữ liệu đổ vào TaskInput
  function startEditTodo (id: string) {
    const findedTodo = todos.find(todo => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  // gõ phím
  function editTodo(name: string) {
    setCurrentTodo((prev) => {
      if (prev)
        return { ...prev, name}
      return null
    })
  }

  function finishEditTodo() {
    setTodos(prev => {
      return prev.map(todo => {
        if(todo.id === currentTodo?.id) {
          return currentTodo as Todo
        }
        return todo
      })
    })
    setCurrentTodo(null)
  }

  function deleteTodo(id : string) {
    if(currentTodo) {
      setCurrentTodo(null)
    }
    setTodos(prev => {
      const findIndexTodo = prev.findIndex(todo => todo.id === id)
      if(findIndexTodo > -1) {
        const result = [...prev]
        result.splice(findIndexTodo, 1)
        return result
      }
      return prev
    })
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput 
                addTodo={addToDo} 
                currentTodo={currentTodo} 
                editTodo={editTodo}
                finishEditTodo={finishEditTodo}
        />
        <TaskList 
                doneTaskList={false} 
                todos={notdoneTodos} 
                handleDoneTodo={handleDoneTodo}
                startEditTodo={startEditTodo}
                deleteTodo={deleteTodo}
        />
        <TaskList 
                doneTaskList 
                todos={doneTodos} 
                handleDoneTodo={handleDoneTodo}
                startEditTodo={startEditTodo}
                deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}

export default TodoList
