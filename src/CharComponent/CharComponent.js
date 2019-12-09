import React from 'react'

const charComponent = (props)=>{
  return(
    <div className="charComponent" onClick={props.click}>
      <p>{props.letter}</p>
    </div>
  )
}


export default charComponent