import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper, ExternalImage, Title, Copy, Row } from "app/NativeComponents/common";

import {
  loadOnboardingText
} from "app/NativeActions";

class OnboardingText extends Component {

  constructor(props){
    super(props);

    this.state = {
      onboarding_text: null,
      loading: true
    }
  }

  componentDidMount() {

    loadOnboardingText(this.props.slug)
    .then((data) => {
      if (data && data.items) {

        if(data.items.length > 0){
          this.setState({
            onboarding_text: data.items[0] ? data.items[0].fields ? data.items[0].fields : null : null,
            loading: false
          });
        }
      }
      this.setState(() => ({loading: false}));
    })
    .catch((err) => {
      this.setState(() => ({loading: false}));
    });


  }

  componentDidUpdate(prevProps) {

  }

  renderImage(){
    if(this.state.onboarding_text.image){
      return(
        <ExternalImage
          style={{
            resizeMode: "contain",
            width: 80,
            height: 80,
            margin: 20
          }}
          contain={true}
          image={this.state.onboarding_text.image.fields.file.url}

        />
      )
    }
  }

  renderTitle(){
    if(this.state.onboarding_text.title && this.state.onboarding_text.title != ""){
      return(
        <Title>{this.state.onboarding_text.title}</Title>
      )
    }
  }

  renderCopy(){
    if(this.state.onboarding_text.description && this.state.onboarding_text.description != ""){
      return(
        <Copy>{this.state.onboarding_text.description}</Copy>
      )
    }
  }

  render() {
    if(this.state.loading == false && this.state.onboarding_text != null){
      return(
        <Wrapper style={{...this.props.style}}>
          <Row>
            {this.renderImage()}
            <Wrapper style={{flex: 1, ...this.props.innderStyle}}>
              {this.renderTitle()}
              {this.renderCopy()}
            </Wrapper>
          </Row>
        </Wrapper>
      )
    }

    return <Wrapper />


  }
}

const mapStateToProps = ({ auth, native }) => {
  const { token, user } = auth;
  const {
    device, platform, isMobile
  } = native;
  return {
    token, user,
    device, platform, isMobile
  };
};

export default connect(
  mapStateToProps,
  {

  }
)(OnboardingText);
