import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, WebContainer, Wrapper, Card, CardBody } from "app/NativeComponents/common";
import { Header, PillButton } from "app/NativeComponents/snippets";

import OnboardingText from './OnboardingText';
import BadCardText from './BadCardText';
import CanceledText from './CanceledText';
import PausedText from './PausedText'
import FreeTrialText from './FreeTrialText';
import NoAccessText from './NoAccessText';
import IOSText from './IOSText';
import {
  appRedirect,
  toggleOnboarding,
  setFeatureModal,

  loadPlanOnboardingInfo
} from "app/NativeActions";

class OnboardingContainer extends Component {

  constructor(props){
    super(props);

    this.state = {
      onboarding_info: null,
      loading: true
    }
  }

  componentDidMount() {

    loadPlanOnboardingInfo(this.props.contentful_slug ? this.props.contentful_slug : this.props.slug)
    .then((data) => {
      if (data && data.items) {

        if(data.items.length > 0){
          this.setState({
            onboarding_info: data.items[0] ? data.items[0].fields ? data.items[0].fields : null : null,
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

  renderHeader(){
    if(!this.props.noHeader){
      return(
        <Header
          title={this.state.onboarding_info.containerTitle}
          leftButtonIcon={
            this.props.leftButtonIcon
          }
          leftButtonAction={this.props.leftButtonAction}
        />
      )
    }
  }

  render() {
    if(this.state.loading == false && this.state.onboarding_info != null){

      if(this.props.isCard){
        return(
          <Card>
            <CardBody>
              <IOSText {...this.props} onboarding_info={this.state.onboarding_info} />
              <OnboardingText {...this.props} onboarding_info={this.state.onboarding_info} />
              <BadCardText {...this.props} onboarding_info={this.state.onboarding_info}/>
              <CanceledText {...this.props} onboarding_info={this.state.onboarding_info}/>
              <FreeTrialText {...this.props} onboarding_info={this.state.onboarding_info}/>
              <NoAccessText {...this.props} onboarding_info={this.state.onboarding_info} />

            </CardBody>
          </Card>
        )
      }

      if(this.props.noContainer){
        return(
          <Wrapper style={{flex: 1}}>
            {this.renderHeader()}
            <WebContainer>
              <Wrapper style={{
                padding:20,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <IOSText {...this.props} onboarding_info={this.state.onboarding_info} />
                <OnboardingText {...this.props} onboarding_info={this.state.onboarding_info} />
                <BadCardText {...this.props} onboarding_info={this.state.onboarding_info}/>
                <CanceledText {...this.props} onboarding_info={this.state.onboarding_info}/>
                <FreeTrialText {...this.props} onboarding_info={this.state.onboarding_info}/>

                <NoAccessText {...this.props} onboarding_info={this.state.onboarding_info} />

              </Wrapper>
            </WebContainer>
          </Wrapper>
        )
      }

      return(
        <Container style={{flex: 1}}>
          {this.renderHeader()}
          <WebContainer>
            <Wrapper style={{
              padding:20,
              alignItems: "center",
              justifyContent: "center"
            }}>
              <IOSText {...this.props} onboarding_info={this.state.onboarding_info} />
              <OnboardingText {...this.props} onboarding_info={this.state.onboarding_info} />
              <BadCardText {...this.props} onboarding_info={this.state.onboarding_info}/>
              <CanceledText {...this.props} onboarding_info={this.state.onboarding_info}/>
              <PausedText {...this.props} onboarding_info={this.state.onboarding_info}/>

              <FreeTrialText {...this.props} onboarding_info={this.state.onboarding_info}/>
              <NoAccessText {...this.props} onboarding_info={this.state.onboarding_info}/>

            </Wrapper>
          </WebContainer>
        </Container>
      );
    }

    return <Container style={{flex: 1}} />


  }
}

const mapStateToProps = ({ auth, native, billing }) => {
  const { token, user } = auth;
  const {
    device, platform, isMobile
  } = native;
  const {
    card_info
  } = billing;
  return {
    token, user,
    device, platform, isMobile,
    card_info
  };
};

export default connect(
  mapStateToProps,
  {
    appRedirect,
    setFeatureModal,
    toggleOnboarding
  }
)(OnboardingContainer);
