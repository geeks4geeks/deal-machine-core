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
  SecondaryButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
    appRedirect,
    toggleActionSheet
} from 'app/NativeActions';

class ShareMoreOptions extends Component {

  render() {

    if(this.props.actionSheet == "share_more_options" && this.props.user){

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
                <Title style={{textAlign: "center"}}>More Options</Title>
                <Copy style={{textAlign: "center"}}>Select an option:</Copy>
              </CardBody>

                <Card>
                  <a target="_blank" rel="noopener noreferrer"  href={"https://www.facebook.com/sharer.php?u="+encodeURIComponent(this.props.shareOptions.url)+"&s=100&p[title]="+encodeURIComponent(this.props.shareOptions.title)+"&p[summary]="+encodeURIComponent(this.props.shareOptions.message)} className="secondary-button">
                    <i className="fa fa-facebook-square"></i> Share On Facebook
                  </a>
                </Card>

                <Card>
                  <a target="_blank" rel="noopener noreferrer" href={"https://www.linkedin.com/shareArticle?url="+encodeURIComponent(this.props.shareOptions.url)+"&mini=true&title="+encodeURIComponent(this.props.shareOptions.title)+"&summary="+encodeURIComponent(this.props.shareOptions.message)} className="secondary-button">
                    <i className="fa fa-linkedin-square"></i> Share On LinkedIn
                  </a>
                </Card>

                <Card>
                  <a target="_blank" rel="noopener noreferrer"  href={"mailto:?subject="+encodeURIComponent(this.props.shareOptions.subject)+"&body="+encodeURIComponent(this.props.shareOptions.message)+" "+encodeURIComponent(this.props.shareOptions.url)} className="secondary-button">
                    <i className="fa fa-envelope"></i> Share Via Email
                  </a>
                </Card>

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

const mapStateToProps = ({ auth, native, drawer }) => {
  const { token, user } = auth;
  const { device, platform, actionSheet } = native;
  const { stats, shareOptions } = drawer;
  return {
    token,
    user,
    device,
    platform,
    actionSheet,
    stats,
    shareOptions
  }
}



export default connect(mapStateToProps, {
  appRedirect,
  toggleActionSheet
})(ShareMoreOptions);
