import React, { Component } from 'react';
import {
  Wrapper,
  CardBody,
  Split,
  Stretch,
  Title,
  Icon,
  CenterCenter,
  DropzoneButton
} from 'app/NativeComponents/common';
import { MenuButton } from 'app/NativeComponents/snippets';

class UploadButton extends Component{

  render(){

    if(this.props.editSignature.include_image > 0){

      if(this.props.device == "mobile"){
        return (
          <MenuButton
            style={{borderBottomWidth: 1,
            borderBottomColor: this.props.colors.border_color,
            borderBottomStyle: "solid"}}
            onPress={()=>this.props.toggleActionSheet("signature_pic")}
            title="Change Photo"
            icon={this.props.upload_photo.uploading ? "loading" : "add-a-photo"}
          />
        );
      }


      return (
        <DropzoneButton
        accept="image/jpeg, image/png"
        mazSize={5242880}

        onDrop={(acceptedFiles)=>{
          this.props.selectPhoto({
            acceptedFiles: acceptedFiles,
            token: this.props.token,
            type: "edit_signature_pic"
          });
        }}>
          <Wrapper style={{borderBottomWidth: 1,
            borderBottomColor: this.props.colors.border_color,
            borderBottomStyle: "solid"}}

            className="deal-button"
          >
            <CardBody>
              <Split>
                <Stretch>
                  <Title>Change Photo</Title>
                </Stretch>

                <Wrapper>
                  <CenterCenter>
                    <Icon
                      style={{marginLeft: 10}}
                      icon={this.props.upload_photo.uploading ? "loading" : "add-a-photo"}
                    />
                  </CenterCenter>
                </Wrapper>
              </Split>
            </CardBody>
          </Wrapper>

        </DropzoneButton>
      );
    }

    return <Wrapper />
  }

}

export default UploadButton;
