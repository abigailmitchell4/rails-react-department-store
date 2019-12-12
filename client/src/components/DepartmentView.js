import React from "react";
import axios from "axios";
import DepartmentForm from "./DepartmentForm"
import ProductForm from "./ProductForm"
import ProductList from "./ProductList"
import { Button, Header, Segment, Icon } from "semantic-ui-react";

class DepartmentView extends React.Component {
  state = { 
    products: [],
    department: {}, 
    editing: false ,
    showProductForm: false
  };

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ department: res.data, });
      })
    axios.get(`/api/departments/${this.props.match.params.id}/products`)
    .then (res => {
      this.setState({ products: res.data })
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
    debugger
  }

  addProduct = (name, price, description) => {
    axios.post(`/api/departments/${this.props.match.params.id}/products`, {name, price, description})
      .then( res => {
        this.setState({ products: [...this.state.products, res.data], });
       
      })
  }

  deleteProduct = (id) => {
    axios.delete(`/api/departments/${this.props.match.params.id}/products/${id}`)
      .then( res => {
        const { products, } = this.state;
        this.setState({ products: products.filter(p => p.id !== id), })
      })
     
  }

  toggleProductForm = () => this.setState({ showProductForm: !this.state.showProductForm });

  render() {
    const { name } = this.state.department;

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
              <Button 
                // addProduct={() => {this.addProduct(this.name, this.description, this.price)}}
                onClick={ this.toggleProductForm }
                >
                Add Product
              </Button>

              <Segment basic>
                {/* <Button icon color="blue" onClick={ this.toggleForm }>
                  <Icon name={ this.state.showForm ? "angle double up" : "angle double down"}/>
                </Button> */}
                { this.state.showProductForm ? <ProductForm addProduct={ this.addProduct }/> : null }
              </Segment>
            </Segment>

            <ProductList 
              products={this.state.products}
              deleteProduct={this.deleteProduct}
              // editProduct={this.editProduct}
              idD={this.props.match.params.id}
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