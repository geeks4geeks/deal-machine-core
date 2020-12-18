import React, { Component } from 'react';
import { Wrapper, Card, CardBody, ProfilePic, ExternalImage } from 'app/NativeComponents/common';

class SignatureImage extends Component{


  render(){


    if(this.props.editSignature.include_image == 1){
      return(
          <CardBody style={{
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ProfilePic
              image={
                this.props.device == "mobile" ?
                  this.props.upload_photo.source && this.props.upload_photo.source != "" ?
                  this.props.upload_photo.source.uri : this.props.editSignature.signature_image :
                this.props.editSignature.signature_image}
              size={100}
              use_full={this.props.upload_photo.use_full}
            />
          </CardBody>
      );
    }else if(this.props.editSignature.include_image == 2){

      return(

          <CardBody style={{
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ExternalImage
              style={{
                height: 100,
                width: 100
              }}
              image={this.props.device == "mobile" ?
                this.props.upload_photo.source && this.props.upload_photo.source != "" ?
                this.props.upload_photo.source.uri : this.props.editSignature.signature_image :
              this.props.editSignature.signature_image}
            />
          </CardBody>

      );

    }

    return <Wrapper />


  }
}

export default SignatureImage;
