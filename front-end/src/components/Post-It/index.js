import React from 'react'
import { useDragNDrop } from '../../contexts/DragNDrop'

import './style.css'



function PostIt ({ value }) {
  const { setDrag } = useDragNDrop()
  const { title, description, author, dateTime } = value



  const handleDragStart = ({ target }) => {
    setDrag(value)
    target.classList.add( 'dragging' )
  }

  const handleDragEnd =  ({ target }) =>
    target.classList.remove( 'dragging' )



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