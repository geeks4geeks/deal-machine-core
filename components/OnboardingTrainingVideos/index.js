import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  /*mobile*/
  toggleCanPop,
  appRedirect,
  editTeam,
  toggleOnboarding,
  toggleDrawer
} from 'app/NativeActions';

class OnboardingTrainingVideos extends Component{



  constructor(props){
    super(props);

    //lets create the video array
    let video_array = [];

    if(this.props.user_dealfinder_page.include_video_1 == 1){
      video_array.push(1)
    }

    if(this.props.user_dealfinder_page.include_video_2 == 1){
      video_array.push(2)
    }

    if(this.props.user_dealfinder_page.include_video_3 == 1){
      video_array.push(3)
    }

    if(this.props.user_dealfinder_page.include_video_4 == 1){
      video_array.push(4)
    }

    if(this.props.user_dealfinder_page.include_video_5 == 1){
      video_array.push(5)
    }

    if(this.props.user_dealfinder_page.include_video_6 == 1){
      video_array.push(6)
    }

    if(this.props.user_dealfinder_page.include_video_7 == 1){
      video_array.push(7)
    }

    if(this.props.device == "desktop"){
      if(this.props.match.params.id){
        if(this.props.match.params.id == "complete"){

          this.state={
            step: null,
            index: null,
            complete: true,
            video_array: video_array
          }

        }else if(parseInt(this.props.match.params.id) > 0){

          this.state={
            step: video_array[parseInt(this.props.match.params.id)-1],
            index: parseInt(this.props.match.params.id),
            complete: false,
            video_array: video_array
          }

        }else{
          this.props.appRedirect({redirect: "dashboard"});
        }
      }
    }else{

      this.state={
        step: video_array[0],
        index: 1,
        complete: false,
        video_array: video_array
      }

    }

  }

  nextStep(index){
    if(index > this.state.video_array.length){
      //complete training
      if(this.props.device == "desktop"){
        this.props.appRedirect({redirect: "trainingVideosOnboarding", payload:{id: "complete"}});
      }else{
        this.setState({complete: true, step: null, index: null})
      }

    }else{

      if(this.props.device == "desktop"){
        this.props.appRedirect({redirect: "trainingVideosOnboarding", payload:{id: parseInt(index)}});
      }else{
        this.setState({complete: false, step: this.state.video_array[parseInt(index)-1], index: parseInt(index)})
      }
    }
  }

  componentDidMount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
    }

    this.props.toggleOnboarding(true);
    this.props.toggleDrawer(false);

    if(
      this.props.user.team_clearance_level > 0 ||
      this.props.user.complete_dealfinder_training == 1 ||
      this.props.user_dealfinder_page.require_training == 0
    ){
      this.props.appRedirect({redirect: "dashboard"});
    }

  }

  componentDidUpdate(prevProps){

    if(this.props.device == "desktop"){
      if(this.props.match){
        if(this.props.match.params.id != prevProps.match.params.id && this.props.match.params.id != "complete"){
          if(parseInt(this.props.match.params.id) > this.state.video_array.length){
            //complete training
            this.setState({complete: true, step: null, index: null})

          }else{
            this.setState({complete: false, step: this.state.video_array[parseInt(this.props.match.params.id)-1], index: parseInt(this.props.match.params.id)})
          }
        }else if(this.props.match.params.id != prevProps.match.params.id && this.props.match.params.id == "complete"){
          this.setState({complete: true, step: null, index: null});
        }
      }
    }

    if(this.props.user.completed_team_training == 1){
      this.props.appRedirect({redirect: "dashboard"});
    }
  }

  render(){
    return(
      <Container>
        <Header
          title="DealFinder Training"
          leftButtonIcon="logo"
        />
        <WebContainer>

          <Body
            step={this.state.step}
            index={this.state.index}
            complete={this.state.complete}
            nextStep={this.nextStep.bind(this)}
            video_array={this.state.video_array}
            {...this.props}

          />

        </WebContainer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, native, settings, drawer, team_link }) => {
  const { token, user } = auth;
  const { device, platform, isMobile } = native;
  const { colors } = settings;
  const { stats } = drawer;
  const { require_training, user_dealfinder_page, dealfinder_page_defaults } = team_link;

  return {
    token,
    user,
    device,
    platform,
    colors,
    stats,
    isMobile,

    require_training,
    user_dealfinder_page,
    dealfinder_page_defaults
  }
}




export default connect(mapStateToProps, {
  /*mobile*/
  toggleCanPop,
  appRedirect,
  editTeam,
  toggleOnboarding,
  toggleDrawer
})(OnboardingTrainingVideos);
