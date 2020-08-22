import React from 'react'

import './style.css'

function PostIt ({ value, setDrag }) {
  const { title, description, author, dateTime } = value

  function handleDragStart (event) {
    const { target } = event
    setDrag(value)
    target.classList.add( 'dragging' )
  }

  function handleDragEnd (event) {
    const { target } = event
    target.classList.remove( 'dragging' )
  }

  return (
    <article 
      draggable={true} 
      className='post-it'
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <p>{title || 'Untitled'}</p>
      <p>{description}</p>
      <p>{author}</p>
      <p>{dateTime}</p>
    </article>
  )
}

export default PostIt