import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import DepartmentForm from "./DepartmentForm"
// import ProductForm from "./ProductForm"
// import ProductList from "./ProductList"
import styled from "styled-components";
import { Button, Header, Segment, Icon, Card } from "semantic-ui-react";

class DepartmentView extends React.Component {
  state = { 
    products: [],
    department: {}, 
    // editing: false ,
    // showProductForm: false
  };

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/departments/${id}`)
      .then( res => {
        this.setState({ department: res.data, });
      })
    axios.get(`/api/departments/${id}/products`)
    .then (res => {
      this.setState({ products: res.data })
    })
  }

  // toggleEdit = () => {
  //   this.setState({editing: !this.state.editing})
  // }

  // editDepartment = (department) => {
  //   const id = this.props.match.params.id
  //   axios.put(`/api/departments/${id}`, {department})
  //   .then( res => {
  //     const department = this.state.department
  //     if (department.id === id)
  //       return res.data
  //     return department
  //   })
  //   this.setState({ department });
  //   debugger
  // }

  // addProduct = (name, price, description) => {
  //   axios.post(`/api/departments/${this.props.match.params.id}/products`, {name, price, description})
  //     .then( res => {
  //       this.setState({ products: [...this.state.products, res.data], });
       
  //     })
  // }

  // deleteProduct = (id) => {
  //   axios.delete(`/api/departments/${this.props.match.params.id}/products/${id}`)
  //     .then( res => {
  //       const { products, } = this.state;
  //       this.setState({ products: products.filter(p => p.id !== id), })
  //     })
     
  // }

  listProducts = () => {
    const { id, } = this.props.match.params
    return this.state.products.map(p => (
      <div style={{ marginTop: '40px', padding: '20px'}}>
        <Link to={`/departments/${id}/products/${p.id}`}>
          <Card style={{ height: "fit-content", width: '300px', textAlign: 'center', padding: '25px', color: 'black' }}>
            <h3>{p.name}</h3>
            <Card.Content>
              ${p.price}
            </Card.Content>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: '20px',
              }}
            >
              {p.description}
            </div>
          </Card>
        </Link>
      </div>
    ))
  }

  // toggleProductForm = () => this.setState({ showProductForm: !this.state.showProductForm });

  render() {
    const { name, id } = this.state.department;
    // const { id } = this.props.match.params
    return (
      <div>
        {/* {
          this.state.editing ?
          <DepartmentForm 
            name={this.name} 
            id={this.id} 
            toggleEdit={this.toggleEdit}
            editDepartment={this.editDepartment}
          /> 
          : */}
          <>
           <br/>
           <SegmentPadding >
              <Header as="h1">{ name }</Header>
              <Button 
                color="black" 
                size="tiny"
                onClick={this.props.history.goBack}
                icon="arrow circle left"
                >
                  
                </Button> 
                <Link to={`/departments/${id}/edit`}>
                  <Button
                    icon
                    color="teal"
                    size="mini"
                    style={{ marginLeft: "15px"}}
                    // onClick={this.toggleEdit}
                  >
                  <Icon name="edit"/>
                  </Button>
                </Link>
              
              {/* <Segment basic>
                { { this.state.showProductForm ? <ProductForm addProduct={ this.addProduct }/> : null } 
              </Segment> */}
            </SegmentPadding>
            <Link to={`/departments/${id}/products/new`}>
              <Button 
              // onClick={ this.toggleProductForm }
              circular
              icon="plus"
              color="pink"
              >
              </Button>
            </Link>
          
              <br/>
            {/* <ProductList 
              products={this.state.products}
              deleteProduct={this.deleteProduct}
              // editProduct={this.editProduct}
              id={id}
            /> */}
            <Card.Group productsPerRow={3}>
            {this.listProducts()}
          </Card.Group>
          </>
        <br />
        <br />
      </div>
    )
  }
}

const SegmentPadding = styled(Segment)`
  border: none !important;
`


export default DepartmentView;