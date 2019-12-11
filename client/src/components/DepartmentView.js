import React from "react";
import axios from "axios";
import DepartmentForm from "./DepartmentForm"
import ProductList from "./ProductList"
import { Button, Header, Segment, Icon } from "semantic-ui-react";

class DepartmentView extends React.Component {
  state = { 
    products: [],
    department: {}, 
    editing: false 
  };

  

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ department: res.data, });
      })
  }

  toggleEdit = () => {
    this.setState({editing: !this.state.editing})
  }

  editDepartment = (department) => {
    const id = this.props.match.params.id
    axios.put(`/api/departments/${id}`, {department})
    .then( res => {
      const department = this.state.department
      if (department.id === id)
        return res.data
      return department
    })
    this.setState({ department });
  }

  addProduct = (name, description, price) => {
    axios.post(`/api/menus/${this.props.id}/products`, { name }, {description}, {price})
      .then( res => {
        this.setState({ products: [...this.state.products, res.data], });
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
          <>
            <Segment>
              <Header as="h1">{ name }</Header>
              <Button addProduct={() => {this.addProduct(this.name, this.description, this.price)}}>
                Add Product
              </Button>
            </Segment>
            <ProductList 
              products={this.state.products}
              // removeProduct={this.removeProduct}
              // editProduct={this.editProduct}
            />
          </>
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