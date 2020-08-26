import React, { useState, useEffect } from 'react'
import { FaSave, FaBan } from 'react-icons/fa'

import { useData } from '../../contexts/Data'

import './style.css'

function Editor () {
  const { data, visible, setVisible, edited, setEdited, insertPostIt, updatePostIt } = useData()
  const [ selected, setSelected ] = useState({
    yellow: true, pink: false, blue: false, orange: false
  })

  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ state, setState ] = useState('to-do')
  const [ date, setDate ] = useState('')
  const [ time, setTime ] = useState('')
  const [ color, setColor ] = useState('yellow')



  useEffect( () => {
    resetValues(edited || {})
  }, [edited] )

  useEffect( () => {
    setSelected( old => Object.keys( old )
      .reduce( ( acc, key ) => {
        acc[key] = color === key 
        return acc
      }, {} ))
  }, [color] )



  const resetValues = (values = {}) => {
    setSelected({ yellow: true, pink: false, blue: false, orange: false })
    setTitle(values.title || '')
    setAuthor(values.author || '')
    setDescription(values.description || '')
    setState(values.state || '')
    setDate(values.date || '')
    setTime(values.time || '')
    setColor(values.color || 'yellow')
  } 

  const getPostIt = () =>
    ({ title, author, description, date, time, state, color })

  const restartEditor = () => {
    resetValues()
    setEdited({})
    setVisible(false)
  }


  const handleOnChangeInput = ( setValue ) => event =>
    setValue( event.target.value )

  const handleOnSubmit = event =>
    event.preventDefault()

  const handleOnClickColor = value => event => {
    setColor(value)
  }

  const handleOnClickSave = event => {
    const postIt = getPostIt()
    const index = data.indexOf(edited)
    
    index === -1 ? insertPostIt( postIt ) : updatePostIt( postIt, index )

    restartEditor()
  }

  const handleOnClickCancel = event => restartEditor()



  const Button = ({ value }) => {
    const isSelected = selected[value] === true ? 'selected': ''
    return(
      <button 
        className={`${value} ${isSelected}`}
        onClick={handleOnClickColor(value)}
      ></button>
    )
  }



  return(
    <section className={`pop-up ${visible ? 'visible': '' }`} onClick={handleOnClickCancel} >
      <form className='editor' 
        onSubmit={handleOnSubmit}
        onClick={ event => event.stopPropagation() }
      >
        <h1>Editor POST-IT</h1>

        <input 
          type='text' placeholder='Title' value={title} 
          onChange={handleOnChangeInput(setTitle)} 
        />
        
        <input 
          type='text' placeholder='Author' value={author} 
          onChange={handleOnChangeInput(setAuthor)}
        />
        
        <textarea 
          placeholder='Description' value={description} 
          onChange={handleOnChangeInput(setDescription)}
        ></textarea>
        
        <select value={state} onChange={handleOnChangeInput(setState)}>
          <option value='to-do'>TO DO</option>
          <option value='in-progress'>IN PROGRESS</option>
          <option value='done'>DONE</option>
        </select>

        <article className='datetime'>
          <input 
            type='date' value={date} 
            onChange={handleOnChangeInput(setDate)} 
          />
          
          <input 
            type='time' value={time} 
            onChange={handleOnChangeInput(setTime)} 
          />
        </article>

        <article className={'colors'}>
          {Object.keys( selected )
            .map( key => <Button key={key} value={key} /> )}
        </article>

        <article className='buttons'>
          <button onClick={handleOnClickSave}>
            <FaSave size={18} />
            <span>Save</span>
          </button>
          <button onClick={handleOnClickCancel}>
            <FaBan size={18} />
            <span>Cancel</span>
          </button>
        </article>

      </form>
    </section>
  )

}

export default Editor