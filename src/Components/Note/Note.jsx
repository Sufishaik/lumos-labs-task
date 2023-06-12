import React, { useState } from 'react'
import { Check, PenTool, Trash } from 'react-feather';
import { Rating } from 'react-simple-star-rating'
import "../Note/NoteStyle.css";
function Note({item, refresh}) {
  const savedData = JSON.parse(localStorage.getItem("Notes")) || [];
  const [rating, setrating] = useState(item.priority === "high" ? 100 : 0);
  const [edit, setedit] = useState(false);
  const [content, setcontent] = useState(item.content);
  const [title, settitle] = useState(item.title);
  const handleDelete = () => {
    const pass = window.confirm("Are You Sure you Want to delete this notes ?");
    if(!pass) {
      return;
    }
    if(savedData.length) {
      let newData = savedData.filter((item) => item.id !==item.id);
      localStorage.setItem("Notes", JSON.stringify(newData));
      refresh()
    }
  }
  const handleEdit = () => {
    let idx = savedData.findIndex((x) => x.id === item.id);
    savedData[idx].title = title;
    savedData[idx].content = content;
    localStorage.setItem("Notes", JSON.stringify(savedData));
    setedit(false);
    refresh()
  }
  return (
    <>
      <div className="px-2 col-lg-3 col-md-4 col-sm-6 h-100 mb-5">
        <div className="card shadow px-2"
        style={{ backgroundColor: `${item.background}` }}>
            <div className='title-div w-100 text-center'>
            <div className="priority text-center text-light shadow">
             <p className="text-light fw-light mb-0">Priority</p>
             <Rating ratingValue iconsCount={1} transition={true} className='star'/>
                {rating === 100 ? (
                  <p className='fw-bold text-warning'>High</p>
                ) : (<p className='text-light'>Normal</p>)
              }
            
            </div>
            <h1 className='fw-light'>{item.title}</h1>
            </div>
            <div className='content'>
               <textarea name="" id="" cols="30" rows="10" className='form-control' disabled={!edit} value={content} onChange={(e) => setcontent(e.target.value)} style={{backgroundColor : `${item.forground}`}}>
               </textarea>
            </div>
            <section className='d-flex justify-content-between my-2'>
            {
              !edit ? (
                <button className='btn btn-outline-warning btn-sm shadow' onClick={() => setedit(true)}>
                <PenTool/>
                </button>
              ) : (
                <button className='btn btn-outline-primary btn-sm shadow' onClick={handleEdit}>
                  <Check/>
                </button>
              )
            }
            <button className='btn btn-outline-danger btn-sm shadow' onClick={handleDelete}>
              <Trash/>
            </button>
            </section>
        </div>
      </div>
    </>
  )
}

export default Note
