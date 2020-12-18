import React, { Component } from 'react';
import { Wrapper, Card, CardBody, ProfilePic } from 'app/NativeComponents/common';

import UploadButton from './UploadButton';
import PhotoSwitch from './PhotoSwitch';
class ProfileImage extends Component{


  render(){

    return (
      <Wrapper>
        <CardBody style={{
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ProfilePic
            email={this.props.editUser.email}
            image={
              this.props.device == "mobile" ?
                this.props.upload_photo.source && this.props.upload_photo.source != "" ?
                this.props.upload_photo.source.uri : this.props.editUser.image :
              this.props.editUser.image}
            size={100}
            use_full={this.props.upload_photo.use_full}
          />
        </CardBody>
        <Card>
          <UploadButton {...this.props} />
        </Card>
      </Wrapper>
    );

  }

}

export default ProfileImage;
