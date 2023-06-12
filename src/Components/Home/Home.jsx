import React, { useEffect, useState } from 'react'
import Navbar from "../Navbar/Navbar.jsx";
import Note from "../Note/Note.jsx";
import { Frown } from 'react-feather';
import Modal from "../Modal/Modals.jsx";
function Home() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    setdata(JSON.parse(localStorage.getItem("Notes")) || []);
  }, []);

  const [showModel, setshowModel] = useState(false);

  const refresh = () => {
    setdata(JSON.parse(localStorage.getItem("Notes")) || []);
  }
  return (
    <div>
      <Navbar setshowModel={setshowModel} data={data} setdata={setdata} refresh={refresh} />
      {
        showModel && (
          <Modal showModel={showModel} setshowModel={setshowModel} refresh={refresh} />
        )
      }
      <div className='row justify-content-between mx-0 p-5'>
       {
        !data.length ? 
        <h1 className='className="text-center display-1 fw-light text-secondary my-5'>
         <Frown size={100}/>
          No Notes. Create New One
        </h1>
        : 
        data.map((item, i) => {
          return <Note key={item.id} item={item} refresh={refresh}/>
        })
       }
      </div>
    </div>
  )
}

export default Home
