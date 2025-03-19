    import React, { useState, useEffect } from 'react';

    function ToDo(){

        const[chores, setChores] = useState([]);
        const [newChore,setNewChore] = useState("");

        useEffect ( () => {const savedChores = localStorage.getItem('chores');
            if(savedChores){
                setChores(JSON.parse(savedChores));
            }
        },[]);



        
        function inputChange(event){
            setNewChore(event.target.value)
          }
          function handleKeyPress(e){
            if(e.key === 'Enter'){
                addChore();
            }
          }
        function moveChoreUp(index){
            if(index > 0){
                const newChores = [...chores];
                [newChores[index], newChores[ index - 1]] = [newChores[index - 1], newChores[index]];
                setChores(newChores);
                localStorage.setItem('chores', JSON.stringify(newChores));
            }
        }

        function moveChoreDown(index){
            if(index < chores.length - 1){
                const newChores = [...chores];
                [newChores[index], newChores[index + 1]] = [newChores[index + 1], newChores[index]];
                setChores(newChores);
                localStorage.setItem('chores', JSON.stringify(newChores));
            }
        }

        function deleteChore(index){
            const newChores = chores.filter ((chore,i) => i != index);
            setChores(newChores);
            localStorage.setItem('chores', JSON.stringify(newChores));
        }
        function addChore(){
            if(newChore.trim() != ""){
                const updatedChores = [...chores,newChore];
                setChores(updatedChores);
                localStorage.setItem('chores', JSON.stringify(updatedChores));
            }
            setNewChore("");
        }
        return (
        <div className="to-do-list">

            <h1>To-Do✅</h1>

            <div>
                <input
                type="text"
                placeholder="Enter your next task.."
                value={newChore}
                onChange={inputChange}
                onKeyDown={handleKeyPress}/>
                <button
                    className='add-button'
                    onClick={addChore}>
                    Add a Task
                </button>
            </div>

            <ol>
                {chores.map((chore,index) =>
                    <li key={index}>
                        <span className='text'>{chore}</span>
                        <button
                            className="complete-button"
                            onClick={() => deleteChore(index)}>
                                 ✔️
                            </button>
                            <button
                            className="move-button"
                            onClick={() => moveChoreUp(index)}>
                               ⬆️
                            </button>
                            <button
                            className="move-button"
                            onClick={() => moveChoreDown(index)}>
                               ⬇️
                            </button>
                    </li>
                )}
            </ol>
        </div>
     )
    }
    export default ToDo