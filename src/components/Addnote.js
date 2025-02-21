import React,{useContext,useState} from 'react'
import notecontext from "../context/notes/noteContest";

const Addnote = (props) => {

    const context = useContext(notecontext)
    const{addNote} = context;
    // const {showAlert} = props;

    const [note,setNote] = useState({title:"",description:"",tag:""})


    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        // showAlert("Your notes added successfully","success")
        setNote({title:"",description:"",tag:""})
      }
      const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})

    }

  return (
    <div className="container my-3">
      <h2>Add Notes</h2>

      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            minLength={3}
            required
            onChange={onChange}
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        
        <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
      </div>
  )
}

export default Addnote
