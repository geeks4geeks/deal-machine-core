import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ModalOverlay,
  Modal,
  Card,
  Form,
  CardBody,
  Title,
  Copy
} from 'app/NativeComponents/common';

import {
  toggleModal,
  startFadeOut
} from 'app/NativeActions';

import ModalIcon from './ModalIcon';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';

import ProgressModal from './ProgressModal';

class ModalView extends PureComponent {

  render() {

    if(this.props.show && (this.props.type == "alert"  || this.props.type == "normal")){

      return (

        <ModalOverlay isVisible={this.props.show} onPress={()=>{
          this.props.toggleModal({show: false, type: null});
        }}>
          <Modal>
            <Card style={{
              minWidth: 200,
            }}>
              <Form onSubmit={()=>{
                this.props.toggleModal({show: false, type: null});
                this.props.onPress();
              }}>
                <CardBody>
                  <ModalIcon {...this.props}/>
                  <Title style={{textAlign: "center", marginBottom: 5}}>{this.props.title}</Title>
                  <Copy style={{textAlign: "center"}}>{this.props.description}</Copy>
                </CardBody>

                <SubmitButton {...this.props} />
                <CancelButton {...this.props}/>
              </Form>
            </Card>
          </Modal>
        </ModalOverlay>

      );
    }else if(this.props.show && this.props.type == "progress"){
      return (
        <ProgressModal {...this.props}/>
      );
    }
    return <Wrapper />
  }
}

const mapStateToProps = ({ native, settings, modal, photo }) => {
  const { device } = native;
  const { colors } = settings;

  const {
    show,
    type,
    startFade,
    title,
    description,
    icon,
    image,
    onPress,
    onCancel,
    cancel,
    submit,
    buttonType
  } = modal;
  const {
    uploaded,
    uploading,
    progress
  } = photo;
  return {
    device,
    colors,
    show,
    type,
    startFade,
    title,
    description,
    icon,
    image,
    onPress,
    onCancel,
    cancel,
    submit,
    buttonType,
    uploaded,
    uploading,
    progress
  };
}

export default connect(mapStateToProps, {
  toggleModal,
  startFadeOut
})(ModalView);
