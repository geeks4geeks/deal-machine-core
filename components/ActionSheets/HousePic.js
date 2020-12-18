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
    updateHouse,
    setModal,
    toggleModal,
    toggleActionSheet,
    getGoogleStreetView,

    updateBillingAddon,

    triggerBillingAddon
} from 'app/NativeActions';

class HousePic extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showImagePicker: false
    };
  }


  componentDidMount() {
    if(this.props.actionSheet){
      switch(this.props.actionSheet){

        case "house_pic":
        case "edit_house_pic":


        break;

      }
    }
  }

  renderUploadButtons(){
    if(this.props.device == "desktop"){
      return(
        <DropzoneButton
          style={{
            height: "auto",
            alignSelf: "stretch"
          }}
          accept="image/jpeg, image/png"
          mazSize={5242880}
          onDrop={(acceptedFiles)=>{
            this.props.toggleActionSheet(null);
            this.props.selectPhoto({
              acceptedFiles: acceptedFiles,
              token: this.props.token,
              type: "edit_house",
              deal_id: this.props.active_property ? this.props.active_property.deal ? this.props.active_property.deal.id : 0 : 0
            });
          }}
        >
          <Card>
            <SecondaryButton onPress={()=>{}}>
              Upload New Photo
            </SecondaryButton>
          </Card>
        </DropzoneButton>
      )
    }

    return(
      <Wrapper>
        <Card>
          <SecondaryButton onPress={()=>{

            //if(this.state.showImagePicker != true){
              //this.setState({showImagePicker: true});

              this.props.selectPhoto("edit_house_camera", this.props.active_property ? this.props.active_property.deal ? this.props.active_property.deal.id : 0 : 0, null, ()=>{
                //this.setState({showImagePicker: false});
                this.props.toggleActionSheet(null);

              })

            //}
          }}>
            Take A Photo
          </SecondaryButton>
        </Card>
        <Card>
          <SecondaryButton onPress={()=>{
              this.props.selectPhoto("edit_house_photo", this.props.active_property ? this.props.active_property.deal ? this.props.active_property.deal.id : 0 : 0, null, ()=>{
                //this.setState({showImagePicker: false});
                this.props.toggleActionSheet(null);
              });
          }}>
            Choose From Library
          </SecondaryButton>
        </Card>
      </Wrapper>
    )
  }

  renderRemoveButton(){
    if(this.props.active_property){
      if(this.props.active_property.deal){
        if(this.props.active_property.deal.image != "" && this.props.active_property.deal.image){
          return (
            <Card>
              <DeleteButton onPress={()=>{
                this.props.toggleActionSheet(null);

                this.props.setModal({
                  title: "Remove Photo",
                  description: 'Are you sure you want to remove this photo?',
                  icon: "",
                  submit: 'Remove Photo',
                  buttonType: "destroy",
                  onPress: ()=>{
                    this.props.updateHouse({
                      token: this.props.token,
                      deal_id: this.props.active_property ? this.props.active_property.deal ? this.props.active_property.deal.id : 0 : 0,
                      type: "edit_photo",
                      payload: ""
                    });
                  },
                  cancel: 'Cancel',
                  onCancel: ()=>{}
                });
                this.props.toggleModal({show: true, type: "normal"});

              }}>
                Remove Photo
              </DeleteButton>
            </Card>
          )

        }
      }
    }
  }

  renderGoogleButton(){
    if(this.props.active_property != null && this.props.user.team_clearance_level > 0){
      if(this.props.active_property.deal){
        if(this.props.active_property.deal.from_google_street_view != 1){

          return(
            <Card>

              <SecondaryButton onPress={()=>{
                this.props.toggleActionSheet(null);

                triggerBillingAddon({props: this.props, feature_slug: "street_view", callback:()=>{
                  this.props.getGoogleStreetView({
                    token: this.props.token,
                    deal_id: this.props.active_property ? this.props.active_property.deal.id : 0
                  })
                }})

              }}>
                Get From Street Pic
              </SecondaryButton>
            </Card>
          )
        }
      }
    }



  }


  render() {

    if(this.props.actionSheet == "house_pic" || this.props.actionSheet == "edit_house_pic"){

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
                <Title style={{textAlign: "center"}}>Change Photo </Title>
                <Copy style={{textAlign: "center"}}>Change or add a photo for {
                    this.props.active_property ? this.props.active_property.property_address : "this property"
                }</Copy>
              </CardBody>
                {this.renderUploadButtons()}
                {this.renderGoogleButton()}
                {this.renderRemoveButton()}
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

const mapStateToProps = ({ auth, native, deal, drawer, property_map, billing }) => {
  const { user, token } = auth;
  const { device, platform, actionSheet } = native;
  const { activeDeal } = deal;
  const { active_property } = property_map;

  const { billing_addons } = billing;

  return {
    token,
    user,
    device,
    platform,
    actionSheet,
    activeDeal,
    active_property,
    billing_addons
  }
}


export default connect(mapStateToProps, {
  selectPhoto,
  updateHouse,
  setModal,
  toggleModal,
  toggleActionSheet,
  getGoogleStreetView,

  updateBillingAddon
})(HousePic);
