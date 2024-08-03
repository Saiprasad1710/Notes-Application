import React,{useContext} from "react";
import notecontext from "../context/notes/noteContest";

const NoteItem = (props) => {

  const context = useContext(notecontext)
  const{deleteNote} = context;


  const {note,updateNote} = props;

  const handleClick = ()=>{
      deleteNote(note._id);

  }

  return (
    <div className="col-md-3 my-3">
      <div className="card" >
        <div className="card-body">
            <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className="fa-solid fa-trash-can mx-2" onClick={handleClick}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={() =>{updateNote(note)}}></i>
            </div>
          <p className="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
