import React from 'react'
import { Form, Header, } from "semantic-ui-react";

class ProductForm extends React.Component {
  state = { name: "", price: "", description: "" }

  // state = { ...this.defaultValues, }

    // const product = { ...this.state, };
    // axios.post(`/api/menus/${this.props.id}/products`, product)
    //   .then( res => {
    //     this.props.history.push(`/api/menus/${this.props.id}/products`);
    //     debugger
    //   })
    //   this.setState({ ...this.defaultValues, }
    // );

  handleProductSubmit = (e) => {
    e.preventDefault();
    this.props.addProduct(this.state.name, this.state.price, this.state.description)
    this.setState({ name: "", price: "", description: "" })
    debugger
  }

  handleChange = (e) => {
    const { target: { name, value, } } = e
    this.setState({ [name]: value, })
    debugger
  }
//****** Check this */

  render() {
    // const { name, price, description, } = this.state

    return(
      <div>
        <Header as="h1">Add New Product</Header>
        <Form onSubmit={this.handleProductSubmit}>
          <Form.Group widths="equal" >
            <Form.Input 
              label="Name"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Price"
              name="price"
              placeholder="Price"
              type="number"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
          <Form.Input
              label="Description"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button color="teal small">Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default ProductForm