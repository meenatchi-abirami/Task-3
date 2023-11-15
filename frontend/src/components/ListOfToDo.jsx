import '../App.css'
import '../index.css' 
import React, { useContext, useEffect } from 'react'
import { Store } from './StoreProvider'
   
const ListOfToDo = () => {

    const {state, dispatch} = useContext(Store)

    useEffect(()=>{
        let listOfNote = fetchAllNotes().then(  
            notes=>{
                let action ={
                    type: 'get-notes',
                    payload: notes
                }
                dispatch(action)
            }
        )
    },[])

    const fetchAllNotes = async()=>{
        let response = await fetch('http://localhost:8081/api/get/notes')
        let data = await response.json()
        return data
    }

    const onCheckbox = async(event, note) =>{
        const checked = event.currentTarget.checked;

        let noteWithCheckboxInformation = {...note,
        done:checked}

        let noteUpdatedPromise = await fetch(`http://localhost:8081/api/update/note`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteWithCheckboxInformation)
        })
        let noteUpdated = await noteUpdatedPromise.json()
        dispatch({
            type: 'update-note',
            payload: noteUpdated
        })
    }

    const onDelete =async(note) =>{
        let response = await fetch(`http://localhost:8081/api/delete/note/${note.id}`,
        {
            method: 'DELETE',
        })
        if(response.status===200){
            dispatch({
                type: 'remove-note',
                payload: note
            })
        }

    }
  return (
    <div>
        <h1>Actions to be done</h1>
        <ul style={{ listStyle: 'none', padding: 0 }}>
    {state.listOfNotes.map((note) => (
        <li
            key={note.id}
            style={{
                borderBottom: '1px solid #ccc',
                marginBottom: '8px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: note.done ? 'line-through' : 'none',
            }}
        >
            <div>
                <strong>{note.title}</strong>
                <p style={{ margin: 0 }}>{note.message}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    onChange={(event) => onCheckbox(event, note)}
                    type="checkbox"
                    checked={note.done}
                    style={{ marginRight: '8px' }}
                />
                <button onClick={() => onDelete(note)}>Delete</button>
            </div>
        </li>
    ))}
</ul>


    </div>
  )
}

export default ListOfToDo