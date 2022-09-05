import '../styles/taskList.scss';
import { FiTrash, FiCheckSquare } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

interface Task{
    id: string;
    title: string;
    isCompleted: boolean;
}

export default function TaskList(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputTitle, setInputTitle] = useState('');

    function handleCreateNewTask(){
        const newTask: Task = {
            id: uuidv4(),
            title: inputTitle,
            isCompleted: false
        }
        setTasks([...tasks, newTask]);
        setInputTitle('');
    }

    function handleTaskCompletion(id: string){
        const newTasks = tasks.map(task => task.id === id ? {
            ...task,
            isCompleted: !task.isCompleted
        } : task);

        setTasks(newTasks);
    }

    function handleTaskDelete(id: string){
        const newTasksList = tasks.filter(task => task.id !== id);

        setTasks(newTasksList);
    }


    return(
        <section className="task-list container">
            <header>
                <h2>Minhas atividades</h2>
                <div className="input-group">
                    <input type="text" onChange={(value) => setInputTitle(value.target.value)} value={inputTitle} placeholder="Adicionar nova atividade"/>
                    <button onClick={handleCreateNewTask}>
                        <FiCheckSquare size={16} color="#fff" />
                    </button>
                </div>
            </header>
            <main>
                <ul>
                    {tasks.map((item, index) => (
                        <li key={index} className={item.isCompleted ? 'task-completed' : ''}>
                            <div className={item.isCompleted ? 'completed' : ''}>
                                <label className='checkbox-container'></label>
                                <input type="checkbox" readOnly checked={item.isCompleted} onClick={() => handleTaskCompletion(item.id)} />
                                <span className="checkmark"></span>
                                <p>{item.title}</p>
                            </div>
                            {!item.isCompleted &&
                                <button  onClick={() => handleTaskDelete(item.id)}>
                                    <FiTrash size={16}/>
                                </button>
                            }
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    );
}