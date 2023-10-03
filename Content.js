import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';


const Content = ({items,score,handleCheck,handleDelete,handleScore}) => {
      
  return (
    <>
      {(items.length) ? (
      <ul>
        {items.map((item)=>(
          <li className="item" key={item.id}>
            <input 
              type="checkbox"
              onChange={()=>handleCheck(item.id)}
              checked={item.checked}
              />
              <label 
              style={(item.checked)?{textDecoration:'line-through'}:null}
              onDoubleClick={()=>handleCheck(item.id)}>
                {item.item}
                </label>
              <FaTrashAlt onClick={()=>handleDelete(item.id)}
              role="button"
              tabIndex="0"
              />
          </li>
        ))}
      </ul>
      ):(
        <p style={{marginTop:'2rem'}}>Your list is Empty</p>
      )
}
<button onClick={handleScore}>Get Score!</button>
<br></br>
{score !== null && <p style={{fontFamily:'cursive'}}>{score}% of the tasks are completed.</p>}
    </>
    
  )
}

export default Content