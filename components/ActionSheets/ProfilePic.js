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


class ProfilePic extends Component {


  constructor(props) {
    super(props);
    this.state = {showImagePicker: false};
  }





  render() {

    if(this.props.actionSheet == "profile_pic"){

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
                <Copy style={{textAlign: "center"}}>Change or add a photo for your profile</Copy>
              </CardBody>


                <Wrapper>
                  <Card>
                    <SecondaryButton onPress={()=>{

                      if(this.state.showImagePicker != true){
                        this.setState({showImagePicker: true});

                        this.props.selectPhoto("edit_profile_pic_camera", this.props.user.id, "camera", ()=>{
                          this.setState({showImagePicker: false});
                          this.props.toggleActionSheet(null);

                        })
                      }
                    }}>
                      Take A Photo
                    </SecondaryButton>
                  </Card>
                  <Card>
                    <SecondaryButton onPress={()=>{

                      if(this.state.showImagePicker != true){
                        this.setState({showImagePicker: true});

                        this.props.selectPhoto("edit_profile_pic_photo", this.props.user.id, "photo", ()=>{
                          this.setState({showImagePicker: false});
                          this.props.toggleActionSheet(null);

                        })

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

const mapStateToProps = ({ auth, native, house }) => {
  const { user } = auth;
  const { device, platform, actionSheet } = native;
  return {
    user,
    device,
    platform,
    actionSheet
  }
}


export default connect(mapStateToProps, {
  selectPhoto,
  toggleActionSheet
})(ProfilePic);
