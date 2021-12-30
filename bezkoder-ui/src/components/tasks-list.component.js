import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tasks_todo: [],
      tasks_doing: [],
      tasks_done: [],
      currentTask: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTasks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTasks() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          tasks_todo: response.data.filter(function (task) { return task.state === "todo" }),
          tasks_doing: response.data.filter(function (task) { return task.state === "doing" }),
          tasks_done: response.data.filter(function (task) { return task.state === "done" })
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTasks();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: task.id
    });
  }

  removeAllTutorials() {
    TaskDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTask: null,
      currentIndex: -1
    });

    TaskDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        let state = null
        if (response.data.length > 0) {
          state = response.data[0].state
        }
        if (state === "todo") {
          this.setState({
            tasks_todo: response.data,
            tasks_doing: [],
            tasks_done: []
          });
        } else if (state === "doing") {
          this.setState({
            tasks_todo: [],
            tasks_doing: response.data,
            tasks_done: []
          });
        } else if (state === "done") {
          this.setState({
            tasks_todo: [],
            tasks_doing: [],
            tasks_done: response.data
          });
        } else {
          this.setState({
            tasks_todo: [],
            tasks_doing: [],
            tasks_done: []
          });
        }
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tasks_todo, tasks_doing, tasks_done, currentTask, currentIndex } = this.state;

    return (
      <div>
        <div className="list row" >
          <div className="col">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title weeeesshhh"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>


        <div>
          <br></br>
          <br></br>
          <br></br>

          <Button variant="primary" href="/add" >
            Create Task
          </Button>

          <br></br>
          <br></br>

        </div>

        <div className="row" >

          <div className="col-md-3">
            <h4> Todo </h4>

            <ul className="list-group">
              {tasks_todo &&
                tasks_todo.map((task, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (task.id === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTask(task, index)}
                    key={index}
                  >
                    {task.title}
                  </li>
                ))}
            </ul>


          </div>
          <div className="col-md-3">
            <h4> Doing </h4>

            <ul className="list-group">
              {tasks_doing &&
                tasks_doing.map((task, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (task.id === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTask(task, index)}
                    key={index}
                  >
                    {task.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-3">
            <h4> Done </h4>

            <ul className="list-group">
              {tasks_done &&
                tasks_done.map((task, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (task.id === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTask(task, index)}
                    key={index}
                  >
                    {task.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-3">
            {currentTask ? (
              <div>
                <h4>Task Detail</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTask.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentTask.description}
                </div>
                <div>
                  <label>
                    <strong>State:</strong>
                  </label>{" "}
                  {currentTask.state ? "Todo" : "Doing"}
                </div>

                <Link
                  to={"/tutorials/" + currentTask.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Task...</p>
              </div>
            )}
          </div>
          <div className="col-md-3">
            <br></br>
            <br></br>
            <Button variant="danger" onClick={this.removeAllTutorials} >
              Remove All
            </Button>
          </div>

        </div>
      </div >
    );
  }
}

//wesh