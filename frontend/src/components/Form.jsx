import React, {useContext, useState, useRef} from 'react'
import { Store } from './StoreProvider';
import '../App.css'
const Form = () => {
    
    const formRef = useRef(null)
    const onAdd = async(event)=>{
        event.preventDefault();
        if(title && message){
            const noteFromForm = {
                title,
                message,
                done:false
            }
        
            let noteSavedPromise = await fetch(`http://localhost:8081/api/save/note`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noteFromForm)
            })
            
            let noteSaved = await noteSavedPromise.json();
            dispatch({
                type: 'add-note',
                payload: noteSaved
            })

            formRef.current.reset();
        }
    }

    const {state, dispatch} = useContext(Store)

    const [title, setTitle] =useState('');

    const[message, setMessage] = useState('');

    const addingTitle = (e) => {
        setTitle(e.target.value)
    }

    const addingMessage = (e) => {
        setMessage(e.target.value)
    }
    return (
    <form ref ={formRef}>
        <label>Title:</label>
        <input onChange={addingTitle} type="text" name="title" />
        <label>Message</label>
        <input onChange={addingMessage} type="text" name="message" />
        <button onClick={onAdd}>Add note</button>
    </form>
  )
}

export default Form