import React, { Component } from 'react';
import { Wrapper, Card, CardBody, ProfilePic } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import CustomText from './CustomText';
import UploadButton from './UploadButton';
import SignatureImage from './SignatureImage';

class SelectUser extends Component{


  render(){

    return(
      <Wrapper>

        <SignatureImage {...this.props}/>

        <Card>
          <Select
            item_ref={"select_image_option"}
            items={[
              {
                key: 0,
                value: 0,
                label: "Don't include image in signature"
              },
              {
                key: 1,
                value: 1,
                label: "Use profile image in signature"
              },
              {
                key: 2,
                value: 2,
                label: "Use company logo in signature"
              }
            ]}
            title="Signature Image:"
            label="Select an option"
            value={this.props.editSignature.include_image}
            text={
              this.props.editSignature.include_image == 0 ? "Don't include image in signature" :
              this.props.editSignature.include_image == 1 ? "Use profile image in signature" :
              this.props.editSignature.include_image == 2 ? "Use company logo in signature" : ""
            }
            onSelect={item => {
              this.props.signatureFieldChanged({ prop: "include_image", value: item })
            }}
          />
          <UploadButton {...this.props}/>
        </Card>
      </Wrapper>
    );

  }
}

export default SelectUser;
