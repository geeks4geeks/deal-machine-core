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
  Bold,
  Form,
  ExternalImage

} from 'app/NativeComponents/common';

import CancelButton from './CancelButton';
import SubmitButton from './SubmitButton';

import {
  acknowledgeEndRoute,
  removeTrackedRoute
} from 'app/NativeActions';

class EndRouteModal extends Component{


  shouldComponentUpdate(prevProps){
    if(prevProps.end_route_info != this.props.end_route_info){
      return true;
    }

    return false;
  }

  renderImage(){
    if(this.props.end_route_info.image && this.props.end_route_info.image != ""){
      return(
        <ExternalImage
          style={{
            height: 150,
            width: "100%",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
          }}
          image={this.props.end_route_info.image}
        />
      )
    }
  }

  renderCopy(){
    if(this.props.end_route_info.properties_added > 0){
      return(
        <Copy style={{
          textAlign: "center"
        }}>
          You added <Bold>{
            this.props.end_route_info.properties_added == 1 ?
            "1 property" :
            this.props.end_route_info.properties_added + " properties"
          }</Bold> on your <Bold>{
            this.props.end_route_info.total_miles
          } mile drive</Bold>. Keep it up!
        </Copy>
      )
    }else{
      return(
        <Copy style={{
          textAlign: "center"
        }}>
          You didn't add any properties on your <Bold>{
            this.props.end_route_info.total_miles
          } mile drive</Bold>. We don't recommend storing this route. Would you like to remove it?
        </Copy>
      )

    }
  }

  render(){
    if(this.props.end_route_info){
      return (
        <ModalOverlay isVisible={true} onPress={()=>{
          this.props.acknowledgeEndRoute();
        }}>
          <Modal style={{
          }}>
            <Form onSubmit={()=>{
              this.props.acknowledgeEndRoute();
              if(this.props.end_route_info.properties_added == 0){
                this.props.removeTrackedRoute({token: this.props.token, route_id: this.props.end_route_info.route_id});
              }
            }}>
              <Card style={{
                alignSelf:"stretch"
              }}>
                {this.renderImage()}
                <CardBody>
                  <Title style={{textAlign: "center", marginBottom: 5, marginTop: 10}}>

                    {this.props.end_route_info.properties_added == 0 ?
                      "You completed your drive"
                    : "Nice! Your drive is complete!"}
                  </Title>

                  {this.renderCopy()}


                </CardBody>
                <SubmitButton
                  token={this.props.token}
                  end_route_info={this.props.end_route_info}
                  acknowledgeEndRoute={this.props.acknowledgeEndRoute}
                  removeTrackedRoute={this.props.removeTrackedRoute}
                />
                <CancelButton
                  end_route_info={this.props.end_route_info}
                  acknowledgeEndRoute={this.props.acknowledgeEndRoute}
                />

              </Card>
            </Form>
          </Modal>
        </ModalOverlay>
      );
    }

    return <Wrapper />
  }


}


const mapStateToProps = ({ auth, drawer, route }) => {
  const { token, user } = auth;
  const { open } = drawer;

  const {
    end_route_info
  } = route;

  return {
    token,
    user,
    end_route_info
  }
}


export default connect(mapStateToProps, {
  acknowledgeEndRoute,
  removeTrackedRoute
})(EndRouteModal);
