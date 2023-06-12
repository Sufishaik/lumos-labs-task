import React, { useState } from 'react'
import { Plus, RefreshCcw, Search, Trash2 } from 'react-feather'

function Navbar({ data, setdata, setshowModel, refresh }) {
  const [searchValue, setsearchValue] = useState("");

  const deleteAll = () => {
    const pass = window.confirm("Are You Sure you Want to delete all notes ?");
   if(!pass) {
    return;
   }
   localStorage.removeItem("Notes");
   refresh();
  }
  const sorter = (value) => {
   if(value === "latest") {
    data.sort((a,b) => b.id - a.id);
   }
   if(value === "oldest") {
    data.sort((a,b) => a.id - b.id);
   }
   if(value === "high") {
    data.sort((a,b) => a.priority.localCompare(b.priority));
   }
   if(value === "normal") {
    data.sort((a,b) => b.priority.localCompare(a.priority));
   }
   setdata([...data]);
  }
  const search = (event) => {
    event.preventDefault();
    let newData;
    if(searchValue) {
      newData = data.filter((val) => 
        val.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setdata([...newData]);
    }else {
      refresh();
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            My Notes
          </a>
          <button className='navbar-toggler' type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown my-3">
                <a href="" className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Sort By
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a href="" className="dropdown-item" onClick={() => sorter("latest")}>
                      LatestFirst
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/"
                      onClick={() => sorter("oldest")}
                    >
                      Oldest First
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/"
                      onClick={() => sorter("high")}
                    >
                      Priority High
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item mx-2">
                <button
                  className="nav-link btn btn-sm btn-info text-light px-2 my-3"
                  onClick={() => setshowModel(true)}
                >
                  <Plus /> Add New
                </button>
              </li>
              <li className="nav-item mx-2">
                <button
                  className="nav-link btn btn-sm btn-danger text-light px-2 my-3"
                  onClick={deleteAll}
                >
                  <Trash2 />
                  Delete All
                </button>
              </li>
            </ul>

            <form action="" className="d-flex" onSubmit={search}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setsearchValue(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                {searchValue ? <Search /> : <RefreshCcw />}
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
