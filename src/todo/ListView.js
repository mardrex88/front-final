import React, {useState, useContext, useEffect} from 'react';
import Consumer from './Consumer';
import Events from './Events';
import Store from '../Store';

export default (listId,todo) => {
    const { dispatch} =useContext(Store);
    const [isLoaded, setLoaded] = useState(false);
    const list = todo.elements.filter((element) => {
        return element.listId === listId;
    });

    useEffect(() => {
        Consumer.findAll(listId).then((response) => {
            if(response.ok){
                response.json().then((items) => {
                    dispatch(Events.finded(list, items));
                    console.log("Todo Completado");
                    setLoaded(true);
                });
            }
            
        })
    },[listId,dispatch]);

    const onDelete = (itemId) =>{
        Consumer.delete(itemId).then((response) => {
            if(response.ok){
                dispatch(Events.deleted(listId,itemId));
            }
        });
    };

    const onEdit = (item) => {
        dispatch(Events.onEdited(listId,item))
    };

    const onChange = (event, item) => {
        const request = {
            name: item.name,
            id:item.id,
            completed:event.target.checked
        };
        Consumer.update(listId,request)
                .then((response)=>{
                    if(response.ok){
                        response.json().then(()=>{
                            dispatch(Events.updated(listId,request));
                        })
                    }
                })
    };

    const decorationDone = {
        textDecoration: "line-through",
        color:"#c3c3c3"
    }

    return <div>
        {!isLoaded && <div> Loading...</div>}
        <table>
            <thead>
                <tr>
                    <td>ID  |</td>
                    <td>Nombre</td>
                    <td>¿Está Completado?</td>
                    <td>Acciones</td>
                </tr>
            </thead>
            <tbody>
                {list.map((todo)=> {
                    return  <tr key={todo.id} style ={todo.completed ? decorationDone:{}} id={"tr"+todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.name}</td>
                    <td><input type= "checkbox" defaultChecked={todo.completed} onChange={(event) =>{onChange(todo)}}></input></td>
                    <td>
                        <button onClick={()=> onDelete(todo.id)}>Eliminar</button>
                        <button disabled={todo.completed} onClick={()=> onEdit(todo)}>Eliminar</button>
                    </td>
                </tr>
                })}
            </tbody>
        </table>


    </div>
}