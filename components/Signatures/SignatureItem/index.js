import React, { Component } from 'react';
import {Card} from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';


class SignatureItem extends Component{


  render(){
    return (
        <Card>
          <MenuItem
            to={"/app/signatures/edit/"+this.props.signature.id}
            onPress={this.props.onPress}
            title={this.props.signature.title}
            text={this.props.signature.phone}
          />
        </Card>
    )
  }

}

export default SignatureItem;
