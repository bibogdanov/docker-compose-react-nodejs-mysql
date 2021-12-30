import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import Form from "react-bootstrap/Form";


export default class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.checkState = this.checkState.bind(this);

    this.state = {
      currentTask: {
        id: null,
        title: "",
        description: "",
        state: "",
        due_date: "",
      },
      message: "",
      flag: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        description: description
      }
    }));
  }

  onChangeDate(e) {
    const due_date = e.target.value;

    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        due_date: due_date
      }
    }));
  }

  onChangeState(e) {
    const state = e.target.value;

    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        state: state
      }
    }));
  }


  checkState(task_state, state) {
    console.log(task_state)
    if (task_state === "") {
      return null
    }
    return task_state === state
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateState(state) {
    var data = {
      id: this.state.currentTask.id,
      title: this.state.currentTask.title,
      due_date: this.state.currentTask.due_date,
      state: state
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            state: state
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/task')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;
    const todoCheck = this.checkState(currentTask.state, "todo")
    const doingCheck = this.checkState(currentTask.state, "doing")
    const doneCheck = this.checkState(currentTask.state, "done")


    return (
      <div>
        {
          currentTask ? (
            <div className="edit-form" >
              <h4>Task</h4>
              <div>
                <Form.Group controlId="title">
                  <Form.Label> Tilte </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="task title"
                    value={currentTask.title}
                    onChange={this.onChangeTitle}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label> Description </Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="description"
                    value={currentTask.description}
                    onChange={this.onChangeDescription}
                  />
                </Form.Group>
                <Form.Group controlId="duedate">
                  <Form.Label> Due Date </Form.Label>
                  <Form.Control
                    type="date"
                    name="duedate"
                    placeholder="Due date"
                    value={currentTask.due_date}
                    onChange={this.onChangeDate}
                  />
                </Form.Group>
                <Form.Group controlId="state">
                  <Form.Label> State </Form.Label>
                  <Form.Check
                    defaultChecked={todoCheck}
                    type="radio"
                    name="state"
                    label="To Do"
                    value="todo"
                    onChange={this.onChangeState}
                  />
                  <Form.Check
                    defaultChecked={doingCheck}
                    type="radio"
                    name="state"
                    label="Doing"
                    value="doing"
                    onChange={this.onChangeState}
                  />
                  <Form.Check
                    defaultChecked={doneCheck}
                    type="radio"
                    name="state"
                    label="Done"
                    value="done"
                    onChange={this.onChangeState}
                  />
                </Form.Group>
              </div>


              < button
                className="badge badge-danger mr-2"
                onClick={this.deleteTask}
              >
                Delete
              </button >

              <button
                type="submit"
                className="badge badge-success"
                onClick={this.updateTask}
              >
                Update
              </button>
              <p>{this.state.message}</p>
            </div >
          ) : (
            <div>
              <br />
              <p>Please click on a Task...</p>
            </div>
          )
        }
      </div>
    );
  }
}
