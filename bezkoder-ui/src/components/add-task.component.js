import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import Form from "react-bootstrap/Form";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      state: "",
      due_date: "",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });

  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeDate(e) {
    this.setState({
      due_date: e.target.value
    });
  }
  onChangeState(e) {
    this.setState({
      state: e.target.value
    });

  }

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      due_date: this.state.due_date,
      state: this.state.state
    };

    console.log(data)

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          due_date: response.data.due_date,
          state: response.data.state,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      id: null,
      title: "",
      description: "",
      due_date: "",
      state: "todo",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <Form.Group controlId="title">
              <Form.Label> Tilte </Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="task title"
                value={this.state.title}
                onChange={this.onChangeTitle}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label> Description </Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="description"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </Form.Group>
            <Form.Group controlId="duedate">
              <Form.Label> Due Date </Form.Label>
              <Form.Control
                type="date"
                name="duedate"
                placeholder="Due date"
                value={this.state.due_date}
                onChange={this.onChangeDate}
              />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label> State </Form.Label>
              <Form.Check
                type="radio"
                name="state"
                label="To Do"
                value="todo"
                onChange={this.onChangeState}
              />
              <Form.Check
                type="radio"
                name="state"
                label="Doing"
                value="doing"
                onChange={this.onChangeState}
              />
              <Form.Check
                type="radio"
                name="state"
                label="Done"
                value="done"
                onChange={this.onChangeState}
              />
            </Form.Group>



            <button onClick={this.saveTask} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
