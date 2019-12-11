import React from "react";
import axios from "axios";
import DepartmentForm from "./DepartmentForm"
import { Button, Header, Segment, Icon } from "semantic-ui-react";

class DepartmentView extends React.Component {
  state = { department: {}, editing: false };

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ department: res.data, });
      })
  }
  
  toggleEdit = () => {
    this.setState({editing: !this.state.editing})
  }

  editDepartment = (id, department) => {
    axios.put(`/api/departments/${id}`, {department})
    .then( res => {
      const department = this.state.department.map( d => {
      if (d.id === id)
        return res.data
      return d
    });
    this.setState({ department });
  })
  }

  render() {
    const { name, } = this.state.department;

    return (
      <div>
        {
          this.state.editing ?
          <DepartmentForm 
            name={this.name} 
            id={this.id} 
            toggleEdit={this.toggleEdit}
            editDepartment={this.editDepartment}
          /> 
          :
          <Segment>
            <Header as="h1">{ name }</Header>
          </Segment>
        }
        <br />
        <br />
        <Button 
          color="black" 
          onClick={this.props.history.goBack}
        >
          Back
        </Button> 
        <Button
          icon
          color="green"
          size="tiny"
          style={{ marginLeft: "15px"}}
          onClick={this.toggleEdit}
        >
        <Icon name="edit"/>
        </Button>
      </div>
    )
  }
}

export default DepartmentView;