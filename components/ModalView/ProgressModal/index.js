import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ModalOverlay,
  Modal,
  Card,
  Form,
  CardBody,
  Title,
  Copy,
  ProgressBar
} from 'app/NativeComponents/common';

import {
  toggleModal,
  startFadeOut
} from 'app/NativeActions';

import ModalIcon from './ModalIcon';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';

class ProgressModal extends Component {

  render() {
    return (
      <ModalOverlay
        isVisible={true}
        onPress={()=>{
          this.props.toggleModal({show: false, type: null})
        }}>
        <Modal>
          <Card style={{
            minWidth: 200
          }}>
            <Form onSubmit={()=>{
              this.props.onPress();
              this.props.toggleModal({show: false, type: null});
            }}>
              <CardBody>
                <ModalIcon {...this.props}/>
                <Title style={{textAlign: "center", marginBottom: 5}}>
                  {!this.props.uploaded ? 'Uploading...' : 'Photo Uploaded'}
                </Title>
                <Copy style={{textAlign: "center"}}>
                  {!this.props.uploaded ? 'Please wait while your photo uploads before continuing.' : 'Your photo has uploaded, please press continue.'}
                </Copy>
                <Wrapper style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <ProgressBar
                    style={{
                      margin:20,
                      borderRadius: 5,
                    }}
                    progress={this.props.progress}
                    width={200}
                    height={10}
                    color={this.props.active_color}
                  />
                </Wrapper>

              </CardBody>

              <SubmitButton {...this.props} />
              <CancelButton {...this.props} />

            </Form>
          </Card>
        </Modal>
      </ModalOverlay>
    );
  }
}

export default ProgressModal;
