import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Container,
  WebContainer,
  Wrapper,
  CardBody,
  Copy,
  Card,
  Input,
  Row
 } from 'app/NativeComponents/common';
import { Header, PillButton } from 'app/NativeComponents/snippets';

import {
  appRedirect,
  changeTab,
  getTags,
  createTeamTag,

  dismissMobileKeyboard
} from 'app/NativeActions';

class CreateCustomPropertyTags extends Component{

  constructor(props){
    super(props);
    this.state = {
      tag_title:''
    };
  }

  componentDidMount(){
    this.props.changeTab("settings");

    if(this.props.user.team_clearance_level == 0){
      this.props.appRedirect({redirect: "settings"});
    }
  }

  saveTag(token){
    dismissMobileKeyboard();
    this.props.createTeamTag({
      token: this.props.token,
      title: this.state.tag_title,
      type: "create"
    });

  }

  updateTagInputChange(value){
    this.setState({tag_title:value});
  }

  checkIfNeedsToSave(){
    if(this.state.tag_title){
      return true;
    }
    return false;
  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "goBack", payload:{type: "tags"}});
  }

  render(){

    return(
      <Container>
        <Header
          title="Create Custom Property Tag"
          leftButtonIcon="arrow-back"
          leftButtonAction={() => this.handleBack()}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : null}
          rightButtonAction={() => this.saveTag(this.props.token, this.state.tag, "create")}
        />
        <WebContainer>
          <Wrapper style={{marginTop:30}}>
            <CardBody>
              <Copy>Enter text for a custom tag to be used to organize your properties.</Copy>
            </CardBody>
            <Card>
              <Input
                name="custom-tag-input"
                placeholder="Enter your custom tag"
                onChange={value => this.updateTagInputChange(value)}
                value={this.state.tag_title}
                type="text"
              />
            </Card>
            {this.checkIfNeedsToSave() ?
              <Row style={{justifyContent: "flex-end"}}>
                <PillButton primary={true}
                  onPress={() => this.saveTag(this.props.token, this.state.tag, "create")}>
                  Save Property Tag
                </PillButton>
              </Row> : null
            }
          </Wrapper>
        </WebContainer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, native, property_tags }) => {
  const { token, user } = auth;
  const { device } = native;
  const { custom_tags, tags_loaded } = property_tags;

  return { token, user, device, custom_tags, tags_loaded }
}



export default connect(mapStateToProps, {
  appRedirect,
  changeTab,
  createTeamTag
})(CreateCustomPropertyTags);
