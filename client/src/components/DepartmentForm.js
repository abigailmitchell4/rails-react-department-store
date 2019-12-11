import React from 'react';
import axios from "axios";

import { Form, Header,} from "semantic-ui-react";


class DepartmentForm extends React.Component {
  state = { name: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.toggleEdit) {
      this.props.editDepartment(this.props.id, this.state.name)
      this.props.toggleEdit()
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

    return (
      <div>
        <Header as="h1">New Department</Header>
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