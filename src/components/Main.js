// import "./Main.css"
import React, { Component } from 'react';
import './Main.css';
import Form from './Form';
import Tasks from './Tasks';

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

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) return;

    this.setState({ tasks });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;
    if (tasks === prevState.tasks) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleSubmit(e) {
    e.preventDefault();
    let { newTask, index } = this.state;
    const { tasks } = this.state;
    newTask = newTask.trim();

    if (newTask === '' || newTask === null) return;
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
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newTask={newTask}
        />
        <Tasks
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tasks={tasks}
        />
      </div>
    );
  }
}
