import {useEffect, useState} from "react";
import NoteEditor from "./components/NoteEditor/NoteEditor.jsx";




function App(){
    const [notes, setNotes] = useState([]);

    // load the notes from localStorage for the first time
    useEffect(()=>{
        const stored = localStorage.getItem("smart-notes");
        if(stored){
            const parsedStoredNotes = JSON.parse(stored);
            if(parsedStoredNotes && Array.isArray(parsedStoredNotes) && parsedStoredNotes.length > 0){
                setNotes(JSON.parse(stored));
            }
        }
    },[]);

    // save the notes to localstorage whenever it changes.
    useEffect(() => {
        localStorage.setItem("smart-notes", JSON.stringify(notes));
    }, [notes]);

    const handleAddNotes = (note) => {
        setNotes((prevState) => [...prevState, note])
    }

    const handleDeleteNotes = (indexToDelete) => {
        setNotes(prevState => prevState.filter((_, index) => index !== indexToDelete));
    }

    return (
        <div>
            <NoteEditor handleAddNotes={handleAddNotes}/>
            <div className="notes-display-container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
                <h2>Saved Notes</h2>
                {
                    notes.map((note, index) => (
                        <div className={"note-card fade-in"} key={index}>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <button className={"delete-button"} onClick={()=> handleDeleteNotes(index)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default App;