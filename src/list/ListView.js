import React, {useState, useContext, useEffect} from 'react';
import TodoForm from "../todo/FormView";
import TodoList from "../todo/ListView";
import Consumer from './Consumer';
import Events from './Events';
import Store from '../Store';


export default () => {
   const { dispatch } = useContext(Store); 
  const {state} = useContext(Store)
 
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        Consumer.findAll()
            .then(response => response.json())
              .then((list) => {
                    dispatch(Events.finded(list));
                    console.log("lista completada");
                    setLoaded(true);
                });
            
           
        },[dispatch]);
   

    const onDelete = (listId) =>{
        Consumer.delete(listId).then((response) => {
            if(response.ok){
                dispatch(Events.deleted(listId));
            }
        });
    };

    return <div>
        {!isLoaded && <div> Loading...</div>}
        {state.list.elements.length === 0 && <div> Lista Vacia</div>}
        {state.list.elements.map((element) => {
            return <div key={element.id} id={"list-to-do"+element.id}>
                <fieldset>
                    <legend>
                        {element.name.toUpperCase()}
                        <button onClick={()=> onDelete(element.id)}>eliminar</button>
                    </legend>
                    <TodoForm listId={element.id} todo= {state.todo} />
                    <TodoList listId={element.id} todo= {state.todo} />
                </fieldset>
            </div>
        })}
    </div>
}