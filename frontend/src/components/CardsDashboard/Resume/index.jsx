import './styles.css'
import backgroundColor from '../../../utils/backgroundColor'


export default function Resume(props) {
  return (
    <>
      <div className={`card-resume ${backgroundColor(props.title)}`}>
        <div className='content-resume'>
          <div className='img-content'>
            <img
              src={props.image}
              alt="Pago"
            />
          </div>
          <div className='info-resume'>
            <h3 className='title-resume'>{props.title}</h3>
            <h3 className='value-resume'>{props.valor}</h3>
          </div>
        </div>
      </div>
    </>
  )
}