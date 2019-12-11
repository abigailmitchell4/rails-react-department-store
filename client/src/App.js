import React, { Fragment, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Departments from './components/Departments';
import DepartmentForm from './components/DepartmentForm';
import DepartmentView from './components/DepartmentView';
import Navbar from './components/Navbar';
import NoMatch from './components/NoMatch';
import { Container, } from "semantic-ui-react";

const App = () => (
  <Fragment>
    <Container>
    <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/departments" component={Departments} />
        <Route exact path="/departments/new" component={DepartmentForm} />
        <Route exact path="/departments/:id" component={DepartmentView} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;
