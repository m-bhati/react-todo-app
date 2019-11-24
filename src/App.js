import React, { Component } from 'react';
import './App.css';
import List from './components/List';
import Header from './components/Header';
import Button from './components/Button';
import TaskForm from './Forms/TaskForm';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: false,
      isLoaded: true,
      error: null,
      tasks: []
    };
    this.updateTodoItem = this.updateTodoItem.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
  }

  componentDidMount() {
    fetch("/api/todos")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            tasks: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  onTaskAdded = (task) => {
    this.setState({
      addNew: !this.state.addNew,
      tasks: [...this.state.tasks, task]
    });
  }

  handleAddNew = () => {
    this.setState({
      addNew: !this.state.addNew
    })
  }

  updateTodoItem = (item) => {
  }

  deleteTodoItem = (item) => {
    fetch(`http://localhost:3000/api/todos/${item._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      const index = this.state.tasks.indexOf(item)
      this.state.tasks.splice(index, 1);
      this.setState({
        tasks: this.state.tasks
      })
    })
    .catch(err => console.error(err)); 

  }

  render() {
    const { error, isLoaded, tasks } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <Header/>
          <List items={this.state.tasks} editItem={this.updateTodoItem} deleteItem={this.deleteTodoItem} />
          <div className="new-item">
            {
              this.state.addNew ? <TaskForm onAdded={this.onTaskAdded} onCancel={this.handleAddNew}/> : <Button action={this.handleAddNew} type={"primary"} title={"Add New"} />
            }
          </div>
  
        </div>
      );
    }

  }

}