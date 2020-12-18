import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ModalOverlay,
  Modal,
  Card,
  CardBody,
  Title,
  Copy,
  SecondaryButton,
  DeleteButton,
  DropzoneButton
} from 'app/NativeComponents/common';
import {
  TextButton,

} from 'app/NativeComponents/snippets';

import {
    selectPhoto,
    toggleActionSheet
} from 'app/NativeActions';


class SignaturePic extends Component {


  constructor(props) {
    super(props);
    this.state = {showImagePicker: false};
  }





  render() {

    if(this.props.actionSheet == "signature_pic"){

      return (

        <ModalOverlay
          isVisible={true}
          onPress={()=>this.props.toggleActionSheet(null)}
        >
          <Modal actionSheet>
            <Card style={{
              minWidth: "95%",
              paddingBottom: this.props.device == "mobile" ? 10 : 0
            }}>
              <CardBody>
                <Title style={{textAlign: "center"}}>Change Photo</Title>
                <Copy style={{textAlign: "center"}}>Change or add a photo for your signature</Copy>
              </CardBody>


                <Wrapper>
                  <Card>
                    <SecondaryButton onPress={()=>{

                      if(this.props.editSignature.include_image == 1){


                        if(this.state.showImagePicker != true){
                          this.setState({showImagePicker: true});

                          this.props.selectPhoto("edit_signature_camera", this.props.user.id, "profile_camera", ()=>{
                            this.setState({showImagePicker: false});
                            this.props.toggleActionSheet(null);

                          })
                        }

                      }else{

                        if(this.state.showImagePicker != true){
                          this.setState({showImagePicker: true});

                          this.props.selectPhoto("edit_signature_camera", this.props.user.id, "camera", ()=>{
                            this.setState({showImagePicker: false});
                            this.props.toggleActionSheet(null);

                          })
                        }

                      }
                    }}>
                      Take A Photo
                    </SecondaryButton>
                  </Card>
                  <Card>
                    <SecondaryButton onPress={()=>{

                      if(this.props.editSignature.include_image == 1){

                        if(this.state.showImagePicker != true){
                          this.setState({showImagePicker: true});

                          this.props.selectPhoto("edit_signature_photo", this.props.user.id, "profile_photo", ()=>{
                            this.setState({showImagePicker: false});
                            this.props.toggleActionSheet(null);

                          })
                        }
                      }else{

                        if(this.state.showImagePicker != true){
                          this.setState({showImagePicker: true});

                          this.props.selectPhoto("edit_signature_photo", this.props.user.id, "photo", ()=>{
                            this.setState({showImagePicker: false});
                            this.props.toggleActionSheet(null);

                          })
                        }
                      }

                    }}>
                      Choose From Library
                    </SecondaryButton>
                  </Card>
                </Wrapper>
                <TextButton
                  onPress={()=>this.props.toggleActionSheet(null)}
                  text={"Cancel"}
                />
            </Card>
          </Modal>
        </ModalOverlay>

      );
    }
    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, native, house, signature }) => {
  const { user } = auth;
  const { device, platform, actionSheet } = native;
  const { editSignature } = signature;

  return {
    user,
    device,
    platform,
    actionSheet,
    editSignature
  }
}

export default connect(mapStateToProps, {
  selectPhoto,
  toggleActionSheet
})(SignaturePic);
