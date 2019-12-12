import React from 'react'
import axios from 'axios';
import ProductForm from './ProductForm'
import { Card, Icon, Button, Header} from "semantic-ui-react";

class Product extends React.Component {
  state = { 
    product: {}, 
    editingProduct: false
  };

  toggleEditProduct = () => {
    this.setState({editingProduct: !this.state.editingProduct})
    debugger
  }

  editProduct = (product) => {
    // const idD = this.props.match.params.id
    debugger
    axios.put(`/api/departments/${this.props.idD}/products/${this.id}`, {product})
    .then( res => {
    const product = this.state.product
      if (product.idD === this.id)
        return res.data
      return product
    })
    debugger
    this.setState({ product });
  }

  render() {
    return (
      <>
      {
      this.state.editingProduct ?
      <ProductForm 
        name={this.name} 
        // price={this.price}
        // description={this.description}
        id={this.id} 
        toggleEditProduct={this.toggleEditProduct}
        editProduct={this.editProduct}
      /> 
      :
      <Card>
        <Card.Content>
          <Header as="h1">{ this.props.name }</Header>
          <Header as="h5" color="grey">${ this.props.price }</Header>
          <p>{ this.props.description }</p>
        <br />
        <br />
        {/* <Button 
          color="black" 
          // onClick={this.props.history.goBack}
        >
          Back
        </Button> */}
        <Button 
            icon
            size="tiny" 
            onClick={() => this.props.deleteProduct(this.props.id)} 
            style={{ marginLeft: "15px", }}
          >
            <Icon name="trash"/>
          </Button >
          <Button 
            icon
            size="tiny" 
            onClick={this.toggleEditProduct} 
            style={{ marginLeft: "15px", }}
          >
            <Icon name="edit"/>
          </Button >
        </Card.Content>
      </Card>
      }
      </>
    )
  }
}


export default Product