import React, { useEffect, useState } from 'react';
import './style.css';


const getLocalData = () => {
  const lists = localStorage.getItem("mytodoList");

  if(lists){
    return JSON.parse(lists);
  } else{
    return [];
  }
}

const Todo = () => {

  const [inputData, setinputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function
  const adItem = () => {
    if(!inputData){
      alert("plz fill the data")
    }
    else if(inputData && toggleButton){
      setItems(
        items.map((curElem) => {
          if(curElem.id === isEditItem){
            return{...curElem, name: inputData};
          }
          return curElem;
        })
      )

      setinputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else{
      const myNewInputData = {
        id:new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, myNewInputData]);
      setinputData("");
    }
  }

  // edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    })
    setinputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  }


  // delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    })
    setItems(updatedItems);
  }

  // remove all elements
  const removeAll = () => {
    setItems([]);
  }

  // adding local storage
  useEffect(() => {
    localStorage.setItem("mytodoList", JSON.stringify(items));
  }, [items])
  

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="todoLogo" />
            <figcaption>Add your List Here ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input type="text" placeholder='✍️ Add Item' className='form-control' value={inputData} onChange={(event) => setinputData(event.target.value)} />

            {toggleButton ? (<i className="far fa-edit add-btn" onClick={adItem}></i>)
            : (<i className="fa fa-plus add-btn" onClick={adItem}></i>)}
          </div>

          {/* Show our Items */}
          <div className="showItems">
            {
              items.map((curElem) => {
                return(
                  <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                      <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                      <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                    </div>
                  </div>
                );
              })
            }
          </div>

          {/* Remove all Items */}
          <div className="showItems">
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo;