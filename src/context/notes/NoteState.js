import React, {useState} from "react";
import noteContext from "./noteContest";

const NoteState = (props)=>{

    const host = "http://localhost:5000";

    const notesInitial = []

    const [notes,setNotes] = useState(notesInitial)


    //fetch all notes
    const getNotes = async ()=>{

      //API call
      const url=`${host}/api/notes/fetchallnotes`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        }
      });
      const json = await response.json();
      // console.log(json);
      setNotes(json);
    }





    //Add a note
    const addNote = async (title,description,tag)=>{

      //API call
      const url=`${host}/api/notes/addnote`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note))

      // console.log("Adding a note");
      // const note =  {
      //   "_id": "66840488381gff3dsc3d0bdfg8ss9bf",
      //   "user": "6685039f87f0b519f367a9f3",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2024-07-03T12:12:56.925Z",
      //   "__v": 0
      // }
    }




    //Delete a note
    const deleteNote = async (id)=>{
      //API call

        const url=`${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            'Content-Type':'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json = response.json();
        // console.log(json);

      //deleting a note
      console.log("deleting a note with id:"+id)
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)

    }





    //Edit a note
    const editNote = async (id,title,description,tag)=>{
      //API call
      const url=`${host}/api/notes/updatenote/${id}`
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const json = response.json();

      let newNotes = JSON.parse(JSON.stringify(notes))
      //logic to edit a note
      for (let index = 0; index < newNotes.length; index++) {
        let element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
        
      }
      setNotes(newNotes)
    }
   
    return (

        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>

    )
}

export default NoteState;