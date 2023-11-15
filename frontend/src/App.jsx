import './App.css'
import './index.css'
import StoreProvider from './components/StoreProvider'
import ListOfToDo from './components/ListOfToDo'
import Form from './components/Form'

function App() {
  
  return (
    <StoreProvider>
      <h1 >Simple To-Do List</h1> 
      <Form/>    
      <ListOfToDo/>
    </StoreProvider>
  )
}

export default App
