import React, { Component } from "react";

/* Import Components */
import Input from "../components/Input";
import TextArea from "../components/Textarea";
import Button from "../components/Button";

class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: {  title: '',
                  description: ''}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState( prevState => ({
      newTask: {
        ...prevState.newTask,
        [name]: value
      }
    }))
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({
      newTask: {  title: '',
                  description: ''}
    });
    let userData = {...this.state.newTask};

    fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(
      (result) => {
        this.props.onAdded(result);
      },
      (err) =>{
        console.log(err);
      }
    );
  }

  handleCancelForm = (e) => {
    e.preventDefault();
    this.setState({
      newTask: {  title: '',
                  description: ''}
    });
    this.props.onCancel();
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        <Input
          title={"Title"}
          name={"title"}
          value={this.state.newTask.title}
          placeholder={"Enter title here"}
          handleChange={this.handleChange}
        />{" "}
        <TextArea
          title={"Description"}
          rows={10}
          value={this.state.newTask.description}
          name={"description"}
          handleChange={this.handleChange}
          placeholder={"Describe about your task"}
        />
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Add"}
          style={buttonStyle}
        />{" "}
        <Button
          action={this.handleCancelForm}
          type={"secondary"}
          title={"Cancel"}
          style={buttonStyle}
        />{" "}
      </form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default TaskForm;
