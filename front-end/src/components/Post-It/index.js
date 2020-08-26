import React, { useState } from 'react'

import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaTrash, 
  FaHandPaper, 
  FaHandRock, 
  FaEdit 
} from 'react-icons/fa'

import { useDragNDrop } from '../../contexts/DragNDrop'
import { useData } from '../../contexts/Data'

import './style.css'



function PostIt ({ value }) {
  const { setDrag } = useDragNDrop()
  const { removePostIt, setVisible, setEdited, changePosition } = useData()
  const [ dragging, setDragging ] = useState(false)
  const { title, description, author, date, time, color } = value



  const handleDragStart = ({ target }) => {
    setDrag(value)
    setDragging(true)
    target.classList.add( 'dragging' )
  }

  const handleDragEnd =  ({ target }) => {
    target.classList.remove( 'dragging' )
    setDragging(false)
  }

  const handleRemovePostIt = event => {
    removePostIt(value)
  }

  const handleUpdatePostIt = event => {
    setEdited(value)
    setVisible(true)
  }

  const handleOnClickLeft = event => {
    changePosition( value, -1 )
  }

  const handleOnClickRight = event => {
    changePosition( value, 1 )
  }



  const HandMove = () => dragging 
    ? <FaHandRock size={33} style={{ gridArea: 'move' }} />
    : <FaHandPaper size={33} style={{ gridArea: 'move' }} />

  const Controller = () => (<section className='controller'>  
    <FaArrowLeft style={{ gridArea: 'left' }}  
      onClick={handleOnClickLeft} />
    <FaArrowRight style={{ gridArea: 'right' }} 
      onClick={handleOnClickRight} /> 

    <HandMove /> 
    
    <FaEdit style={{ gridArea: 'edit' }}  
      onClick={handleUpdatePostIt} />      
    <FaTrash style={{ gridArea: 'trash' }} 
      onClick={ handleRemovePostIt } /> 
  </section>)


  return (
    <li 
      draggable={true} 
      className={`post-it ${color} `}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >


      <p>{title}</p>
      <p>{description}</p>
      <p>{author}</p>
      <p className='datetime'>
        <span>{date}</span>
        <span>{time}</span>
      </p>


      <Controller />



    </li>
  )
}

export default PostIt