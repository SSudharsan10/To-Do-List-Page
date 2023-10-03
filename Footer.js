import React from 'react'

const Footer = ({length}) => {
    
  return (
    <footer>Total {length === 1 ? "Task" : "Tasks"} {length}</footer>
  )
}

export default Footer