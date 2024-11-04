import React, { useEffect, useState } from "react";
import "../assets/css/TodoList.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import { getTasks, addTask, updateTask, deleteTask } from '../services/TasksService';

function TodoList() {
    const [titleForm, setTileForm] = useState("Crear tarea");
    const [tasks, setTasks] = useState([]);
    const { register, handleSubmit, reset, setValue } = useForm();

    const fetchTasks = async () => {
        const tasks = await getTasks();
        setTasks(tasks)
    }

    const handleAddEditTask = async (data) => {
        if (data.titleTask.trim()) {
            if (data.id !== undefined) {
                await updateTask(data);
                let task = tasks.find(t => t.id == data.id);
                task.titleTask = data.titleTask;
                task.descriptionTask = data.descriptionTask;
                Swal.fire({
                    title: '¡Bien hecho!',
                    text: "¡Tarea actualizada correctamente!",
                    icon: 'success',
                    confirmButtonText: `Aceptrar`
                });
                setTileForm("Crear tarea");
                reset();
            }
            else {
                data.completed = false;
                let response = await addTask(data);
                data.id = response.id;
                tasks.push(data);
                Swal.fire({
                    title: '¡Bien hecho!',
                    text: "¡Tarea registrada correctamente!",
                    icon: 'success',
                    confirmButtonText: `Aceptrar`
                });
                reset();
            }
        }
        else {
            Swal.fire({
                title: '¡Advertencia!',
                text: 'El titulo de la tarea es obligatorio.',
                icon: 'warning',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
    };

    const handleToggleComplete = async (index, task) => {
        task.completed = !task.completed;
        await updateTask(task);
        Swal.fire({
            title: '¡Bien hecho!',
            text: `¡Tarea marcada como ${task.completed == true ? 'completada' : 'incompleta'} correctamente!`,
            icon: 'success',
            confirmButtonText: `Aceptrar`
        });
        setTileForm("Crear tarea");
        reset();
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = async (index, task) => {
        await deleteTask(task.id);
        Swal.fire({
            title: '¡Bien hecho!',
            text: "¡Tarea eliminada correctamente!",
            icon: 'success',
            confirmButtonText: `Aceptrar`
        });
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleEditTask = (task) => {
        setTileForm("Editar tarea");
        setValue('id', task.id);
        setValue('titleTask', task.titleTask);
        setValue('descriptionTask', task.descriptionTask);
    }

    const discardChanges = () => {
        setTileForm("Crear tarea");
        reset();
    }

    useEffect(() => {
        fetchTasks();
    }, []
    )
    return (
        <section className="todo-list">
            <header>
                <h1>{titleForm}</h1>
                <form
                    onSubmit={handleSubmit(handleAddEditTask)}
                >
                    <div className="form-floating mb-3">
                        <input
                            name="text"
                            type="text"
                            className="form-control"
                            id="titulo-tarea"
                            placeholder="Tarea de ejemplo"
                            {...register('titleTask')}
                        />
                        <label htmlFor="titulo-tarea">Título de tarea</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea
                            name="description"
                            id="descripcion-tarea"
                            className="form-control"
                            placeholder="Agregar una descripción"
                            style={{ height: '10vh' }}
                            {...register('descriptionTask')}
                        ></textarea>
                        <label htmlFor="descripcion-tarea">Descripción</label>
                    </div>
                    <div className="btn-form-actions">
                        <button className="btn btn-outline-danger" onClick={discardChanges} type="button">Descartar <i className="bi bi-backspace"></i></button>

                        {
                            titleForm === 'Editar tarea' ? <button className="btn btn-outline-success" type="submit">Editar <i className="bi bi-pencil"></i></button> :
                                <button className="btn btn-outline-success" type="submit">Agregar <i className="bi bi-file-earmark-plus"></i></button>
                        }
                    </div>
                </form>
            </header>
            {
                tasks.length > 0 ? <table className="table table-striped table-bordered task-table">
                    <thead>
                        <tr>
                            <th className="completed-header">Hecho</th>
                            <th className="title-header">Título</th>
                            <th className="description-header">Descripción</th>
                            <th className="actions-header">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index} className={task.completed ? "completed" : ""}>
                                <td className="check-input-container">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleComplete(index, task)}
                                    />
                                </td>
                                <td>{task.titleTask}</td>
                                <td className="description-cell">{task.descriptionTask}</td>
                                <td className="actions-cell">
                                    <button className="btn btn-outline-primary" onClick={() => handleEditTask(task)}><i className="bi bi-pencil"></i></button>
                                    <button className="btn btn-outline-danger" onClick={() => handleDeleteTask(index, task)}><i className="bi bi-trash3"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <></>
            }

        </section>
    );
}

export default TodoList;