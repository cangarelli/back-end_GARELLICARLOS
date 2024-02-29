import { useId } from 'react'

// Estilos
import "./style.css";
import { handleSubmit } from '../../hooks/hooksBarrel.js';
import { dv } from '@faker-js/faker';
import { Link } from 'react-router-dom';

const DataForm = (props) => {
    // Parametros
    const { dataQuestions, fetchRoute, buttonsOption } = props
    // Logica 
    handleSubmit (event, {dataToUpdate: dataQuestions, fetchRoute: fetchRoute})
  //   const handleSubmit = (event, dataToUpdate, fetchRoute) => {
  //     event.preventDefault()
  //     console.log ("check params of handleSubmit", event, dataToUpdate, fetchRoute)
  //     const token = document.cookie
  //     console.log ("check dataToUpdate of handleSubmit", dataToUpdate)
  
  //     const updatableData = []
  //     if ( dataToUpdate.type == "Object") {
  //         dataToUpdate.forEach(element => {
  //             updatableData.push(element.id)
  //         });
  //     } 
  //     console.log ("check updatableData of handleSubmit", updatableData)
  //     dataUploader ({ apiRoute: fetchRoute, method:"post", updatableData: updatableData}, token)
  // };
    // Renderizado 
  return (
      <form className='requestDataForm' onClick={handleSubmit}>
        {dataQuestions.map((point)=> {
          return (
            <div key={useId(point.id)} className='requestDataForm__option'>
              <label htmlFor={point.id} className='requestDataForm__option--label'>{point.label}</label>
              <input type={point.type} className='requestDataForm__option--input' id={point.id} name= {point.id} placeholder={point.placeholder} />
            </div>
          )
        })
        }
        <div className='requestDataForm__buttonPad'>
          {buttonsOption.map ((button)=>{
            return (
              button.link != null ?
                (<button key={useId(button.label)} className='requestDataForm__buttonPad--formButton' type={button.type} >
                (<Link to={button.link}>{button.label}</Link>)
                </button>)
              :
              (<button key={useId(button.label)} onClick={button.onClick(event, {dataToUpdate: dataQuestions, fetchRoute: fetchRoute})} className='requestDataForm__buttonPad--formButton' type={button.type} >
                (button.label)
              </button>)              
            )
          })} 
        </div>
      </form>
  )
}

export default DataForm