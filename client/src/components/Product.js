import React from 'react'
import axios from 'axios'
import { Card, Icon, Button, Header} from "semantic-ui-react";

class Product extends React.Component {
  state = { 
    product: {}, 
    editingItem: false
  };

  componentDidMount() {
    axios.get(`/api/menus/${this.props.id}/products`)
      .then( res => {
        this.setState({ products: res.data, });
      })
      .catch( err => {
        console.log(err);
    })
  }

  render() {
    const { name, description, price, } = this.state.product;
    return (
      <Card>
        <Card.Content>
          <Header as="h1">{ name }</Header>
          <Header as="h5" color="grey">${ price }</Header>
          <p>{ description }</p>
        </Card.Content>
        <br />
        <br />
        <Button 
          color="black" 
          onClick={this.props.history.goBack}
        >
          Back
        </Button>
      </Card>
    )
  }
}


export default Product