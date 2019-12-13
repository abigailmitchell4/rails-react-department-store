import React from 'react'
import axios from 'axios'
import { Form, Header, } from "semantic-ui-react";

class ProductForm extends React.Component {
  state = { name: "", price: "", description: "" }

  componentDidMount() {
    const { match: { params: { id, department_id } } } = this.props
    if (id && department_id)
      axios.get(`/api/departments/${department_id}/products/${id}`)
        .then(res => {
          const { name, description, price } = res.data
          this.setState({ name, description, price })
        })
        .catch(err => {
          console.log(err.response)
        })
  }
  // state = { ...this.defaultValues, }

    // const product = { ...this.state, };
    // axios.post(`/api/menus/${this.props.id}/products`, product)
    //   .then( res => {
    //     this.props.history.push(`/api/menus/${this.props.id}/products`);
    //     debugger
    //   })
    //   this.setState({ ...this.defaultValues, }
    // );
  handleChange = (e) => {
    const { target: { name, value, } } = e
    this.setState({ [name]: value, })
  
  }

  handleProductSubmit = (e) => {
    e.preventDefault();
    // if (this.props.toggleEditProduct) {
    //   this.props.editProduct(this.state.name, this.state.price, this.state.description)
    //   this.props.toggleEditProduct()
    // } else {
      const product = { ...this.state }
      const { match: { params: { id, department_id } } } = this.props
      if (id && department_id) {
        axios.put(`/api/departments/${department_id}/products/${id}`, product)
          .then(res => {
            this.props.history.push(`/departments/${department_id}/products/${id}`)
          })
      } else {
          axios.post(`/api/departments/${department_id}/products`, product)
            .then(res => {
              this.props.history.push(`/departments/${department_id}`)
            })
    }
  }

 
//****** Check this */

  render() {
    const { name, price, description, } = this.state
    // const { match: { params: { id, department_id } } } = this.props
    return(
      <div>
        <Header as="h1">Add New Product</Header>
        <Form onSubmit={this.handleProductSubmit}>
          <Form.Group widths="equal" >
            <Form.Input 
              label="Name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Price"
              name="price"
              placeholder="Price"
              type="number"
              value={price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
          <Form.Input
              label="Description"
              name="description"
              placeholder="Description"
              value={description}
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