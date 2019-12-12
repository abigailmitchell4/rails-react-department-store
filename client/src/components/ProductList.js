import React from 'react'
import Product from './Product'
import { Card } from 'semantic-ui-react'
// import { Card,} from "semantic-ui-react";

const ProductList = (props) => (
  <Card.Group >
    {
    props.products.map( product => (
      <Product
        key={product.id} {...product}
        deleteProduct={props.deleteProduct}
        // editProduct={props.editProduct}
      />
    ))
    }
  </Card.Group>
)

export default ProductList