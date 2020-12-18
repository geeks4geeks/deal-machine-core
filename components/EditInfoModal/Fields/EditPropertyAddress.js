import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';

import AddressFields from './AddressFields';

class EditPropertyAddress extends Component{

  render(){
    //get state name Array


    return (
      <Wrapper>
        <AddressFields {...this.props} />
      </Wrapper>
    );
  }

}

export default EditPropertyAddress;
