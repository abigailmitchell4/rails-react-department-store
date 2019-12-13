import React from 'react'
import axios from 'axios';
// import ProductForm from './ProductForm'
import { Link, } from 'react-router-dom';
import { Card, Icon, Button, Header} from "semantic-ui-react";

class Product extends React.Component {
  state = { 
    product: {}, 
    // editingProduct: false
  };

  // toggleEditProduct = () => {
  //   this.setState({editingProduct: !this.state.editingProduct})
  //   debugger
  // }

  // editProduct = (name, price, description) => {
  //   const product = {name, price, description}
  //   axios.put(`/api/departments/${this.props.idD}/products/${this.props.id}`, {product})
  //   .then( res => {
  //   const product = this.state.product
  //     if (product.id === this.props.id)
  //       return res.data
  //     return product
  //   })
  //   this.setState({ product });
  // }
  componentDidMount() {
    const { match: { params: { id, department_id } } } = this.props
    axios.get(`/api/departments/${department_id}/products/${id}`)
      .then(res => {
        this.setState({ product: res.data })
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  handleDelete = () => {
    const { id, department_id } = this.props.match.params;
    axios.delete(`/api/departments/${department_id}/products/${id}`)
      .then(res => {
        this.props.history.push(`/departments/${department_id}`)
      })
  }

  render() {
    const { match: { params: { id, department_id } } } = this.props
    const { name, description, price } = this.state.product
    return (
      <>
      {/* {
      this.state.editingProduct ?
      <ProductForm 
        name={this.name} 
        price={this.price}
        description={this.description}
        id={this.id} 
        toggleEditProduct={this.toggleEditProduct}
        editProduct={this.editProduct}
      /> 
      : */}
      <Card>
        <Card.Content>
          <Header as="h1">{ name }</Header>
          <Header as="h5" color="grey">${ price }</Header>
          <p>{ description }</p>
        <br />
        <br />
        <Button 
          color="black" 
          // onClick={this.props.history.goBack}
        >
          Back
        </Button>
        <Button 
            icon
            size="tiny" 
            onClick={this.handleDelete} 
            style={{ marginLeft: "15px", }}
          >
            <Icon name="trash"/>
          </Button >
          <Link to={`/departments/${department_id}/products/${id}/edit`}>
            <Button 
              icon
              size="tiny" 
              // onClick={this.toggleEditProduct} 
              style={{ marginLeft: "15px", }}
            >
              <Icon name="edit"/>
            </Button >
          </Link>
        </Card.Content>
      </Card>
      
      </>
    )
  }
}


export default Product