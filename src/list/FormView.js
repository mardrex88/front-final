import React,{useContext, useState, useRef} from 'react';
import Consumer from './Consumer';
import Events from './Events';
import Store from '../Store';

export default () => {
    const { dispatch } = useContext(Store);
    const formRef = useRef(null);
    const [state,setState] = useState({name:""});

    const onCreate = (event) => {
        event.preventDefault();
        Consumer.save({name: state.name, id: null})
            .then((response) => {
                if(response.ok){
                    response.json().then((newList) =>{
                        dispatch(Events.saved(newList));
                        formRef.current.reset();
                        setState({name: ""})
                    })
                }
            })
    }

    return <form ref={formRef}>
        <input
            type="text"
            name="name"
            placeholder='Lista de To - Do'
            onChange={(event)=>{
                setState({name: event.target.value })
            }}></input>
        <button onClick={onCreate}>Crear Lista</button>
    </form>
}