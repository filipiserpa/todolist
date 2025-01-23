// import "./Main.css"
import React, { Component } from 'react';

import { FaEdit, FaPlus, FaWindowClose } from 'react-icons/fa';

import './Main.css';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      tasks: [],
      index: -1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let { newTask, index } = this.state;
    const { tasks } = this.state;
    newTask = newTask.trim();

    if (tasks.indexOf(newTask) !== -1) return;

    const newsTasks = [...tasks];
    if (index === -1) {
      this.setState({
        tasks: [...newsTasks, newTask],
        newTask: '',
      });
    } else {
      newsTasks[index] = newTask;

      this.setState({
        tasks: [...newsTasks],
        index: -1,
      });
    }
  }

  handleChange(e) {
    this.setState({
      newTask: e.target.value,
    });
  }

  handleEdit(e, index) {
    const { tasks } = this.state;

    this.setState({
      index,
      newTask: tasks[index],
    });
  }

  handleDelete(e, index) {
    console.log(e, index);
    const { tasks } = this.state;
    const newsTasks = [...tasks];
    newsTasks.splice(index, 1);
    this.setState({
      tasks: [...newsTasks],
    });
  }

  render() {
    const { newTask, tasks } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>
        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input
            className="inputMain"
            type="text"
            onChange={this.handleChange}
            value={newTask}
          ></input>
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tasks">
          {tasks.map((task, index) => (
            <li key={task}>
              {task}
              <span>
                <FaEdit
                  className="edit"
                  onClick={(e) => this.handleEdit(e, index)}
                />
                <FaWindowClose
                  className="delete"
                  onClick={(e) => this.handleDelete(e, index)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
