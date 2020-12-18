

import React, { Component } from 'react';

import {
  Card,
  CardBody,
  Wrapper
} from 'app/NativeComponents/common';

import PropertyTags from './PropertyTags';
import Lists from './Lists';

class ListAndTags extends Component{

  constructor(props){
    super(props);


  }

  componentDidUpdate(prevProps){

  }

  render(){
    if(this.props.active_property.deal){
      return(
        <Card>
          <Lists {...this.props} />
          <PropertyTags {...this.props} />
        </Card>
      )
    }

    return <Wrapper />
  }

}



export default ListAndTags;
