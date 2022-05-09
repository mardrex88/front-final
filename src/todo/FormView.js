import React,{useContext, useState, useRef} from 'react';
import Consumer from './Consumer';
import Events from './Events';
import Store from '../Store';

export default ({listId, todo}) => {
    const { dispatch } = useContext(Store);
    const formRef = useRef(null);
    const item = todo.item[listId] ? todo.item[listId] :{};
    const [state,setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();

        const request ={
            name: state.name,
            id: null,
            completed:false
        }

        Consumer.save(listId,request)
            .then((response) => {
                if(response.ok){
                    response.json().then((result) =>{
                        dispatch(Events.saved(listId,result));
                        formRef.current.reset();
                        setState({name: ""})
                    })
                }
            })
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request ={
            name: state.name,
            id: null,
            completed:false
        }

        Consumer.update(listId,request)
            .then((response) => {
                if(response.ok){
                    response.json().then((result) =>{
                        dispatch(Events.updated(listId,result));
                        formRef.current.reset();
                        setState({name: ""})
                    })
                }
            })
    };

    return <form ref={formRef}>
        <input
            type="text"
            name="name"
            placeholder='Que tarea piensas hacer?'
            onChange={(event)=>{
                setState({ ...state,name: event.target.value })
            }}></input>
        {item.id && <button onClick={onEdit}>Actualizar</button>}
        {!item.id && <button onClick={onAdd}>Crear Tarea</button>}
    </form>
}