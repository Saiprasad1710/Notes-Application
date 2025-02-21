import React,{useContext, useEffect, useRef, useState} from 'react'
import notecontext from "../context/notes/noteContest";
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(notecontext)
    const{notes,getNotes,editNote} = context;


    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes()
        // eslint-disable-next-line
      }
      else{
        navigate("/login");
      }
    },[])

    const ref = useRef(null);
    const refClose=useRef(null);
    const [note,setNote] = useState({id:"", etitle:"",edescription:"",etag:""})

    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
      }
      
      
      const handleClick = (e) =>{
        // console.log("notes is updating...",note)
        editNote(note.id,note.etitle,note.edescription,note.etag)

        refClose.current.click();
    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})

    }

  return (
    <>
  
    <Addnote />


    <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
        
        {/* Adding form  */}
          <form className="my-3">
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={note.etitle}
            aria-describedby="emailHelp"
            minLength={3}
            required
            onChange={onChange}
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value={note.etag}
            onChange={onChange}
          />
        </div>
        
      </form>
          
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<3 || note.edescription.length<3} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>


    <div className="row my-3">
      <h2>Your Notes</h2>
      <div className="container mx-2">
      {notes.length===0 && 'No notes to show'}
      </div>

      {Array.isArray(notes) && notes.map((note) =>{
       
        return <NoteItem key={note._id} updateNote={updateNote} note={note}/>;
      })

      }

      </div>
      </>
  )
}

export default Notes
