import React from 'react'

import PostIt from '../Post-It'
import { useDragNDrop } from '../../contexts/DragNDrop'

import './style.css'

function List ({ title }) {
  const { data, setDrag, updateData } = useDragNDrop()



  const preventDefault = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragEnter = ({ target }) => {
    if( target.tagName === 'UL')
      target.classList.add('drag-enter')
  }

  const handleDragLeave = ({ target }) => {
    if( target.tagName === 'UL') 
      target.classList.remove('drag-enter')
  }

  const handleDrop = ({ target }) => { 
    if( target.tagName === 'UL') {
      updateData( title )
      target.classList.remove('drag-enter')
    }
    setDrag({})
  }



  const getPostIt = () => data
    .filter( ({state}) => state === title )
    .map( (postIt, index) => (
      <PostIt 
        key={index}
        value={postIt} 
      />) 
    )



  return(
    <section className='list-container'>
      <h1 className={title}>{title.replace('-', ' ')}</h1>
      <ul
        onDragOver={preventDefault} 
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop} 
      >

        {getPostIt()}

      </ul>
    </section>
  )

}

export default List
