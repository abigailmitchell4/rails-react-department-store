import React from 'react';
import axios from "axios";

import { Form, Header,} from "semantic-ui-react";


class DepartmentForm extends React.Component {
  state = { name: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    const department = { ...this.state }
    const { match: { params: { id } }, history: { push } } = this.props
    // if (this.props.toggleEdit) {
    //   this.props.editDepartment(this.state)
    //   this.props.toggleEdit()
    // }
    if (id) {
      axios.put(`/api/departments/${id}`, department)
      .then(res => push(`/departments/${id}`))
    }
    else {
      const department = { ...this.state, };
      axios.post("/api/departments", department)
        .then( res => {
          this.props.history.push("/departments");
        })
        this.setState({ name: "" });
    }
  }

  handleChange = (e) => {
    const { target: { name, value, } } = e;
    this.setState({ [name]: value, });
  }

  render() {
    const { name,} = this.state;
    const { id } = this.props.match.params
    return (
      <div>
        {
          id ?
          <Header as="h1">Edit Department</Header>
          :
          <Header as="h1">New Department</Header>
        }
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              label="Name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Button color="black">Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default DepartmentForm;