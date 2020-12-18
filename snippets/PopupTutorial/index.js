import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Wrapper, Modal, ModalOverlay, Title, Copy, CardBody, ExternalImage, Video, Card, Button, Bold } from 'app/NativeComponents/common';
import { Carousel, TextButton, PillButton } from 'app/NativeComponents/snippets';

import {
  getTutorial,
  completeTutorial,

  openUrl
} from 'app/NativeActions';

class PopupTutorial extends PureComponent{

  componentDidMount(){
    if(this.props.tutorial_slug && this.props.tutorial_slug != ""){
      this.props.getTutorial({token: this.props.token, tutorial_slug: this.props.tutorial_slug})
    }
  }

  finishTutorial(){
    this.props.completeTutorial({
      token: this.props.token,
      tutorial_slug: this.props.tutorial_slug
    })
  }

  renderItemMedia(item){
    switch(item.media_type){

      case "image":

        return(
          <Wrapper style={{
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ExternalImage
              style={{
                height: 420,
                width: 232,
              }}
              contain
              image={item.media}
            />
          </Wrapper>
        );
      break;

      case "video":
        return(
          <Wrapper style={{
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Video
              video={item.media}
              height={this.props.device == "desktop" ? item.desktop_height : item.height}
              width={this.props.device == "desktop" ? item.desktop_width : item.width}
              controls={false}
              muted={true}
              repeat={true}
              autoplay={true}
            />
          </Wrapper>

        )
      break;

    }
  }

  renderDismissButton(index){
    if(index === this.props.tutorial.steps.length - 1){
      return(
        <Wrapper style={{
          alignSelf: "stretch",
          alignItems:"center",
          justifyContent: "center"
        }}>
          <PillButton
            primary={true}
            onPress={() => this.props.completeTutorial({
              token: this.props.token,
              tutorial_slug: this.props.tutorial_slug
            })}
          >
            {this.props.tutorial.complete_button_text}
          </PillButton>
        </Wrapper>
      )
    }
  }

  renderBottomLink(item){

    if(item.link && item.button_text){
      return(
        <TextButton color={this.props.colors.white_color} onPress={()=>{
          openUrl(item.link)
        }}
          text={item.button_text}
        />
      )
    }
  }

  renderCarouselItem({item, index}){

    return (
      <Wrapper>
        {this.renderItemMedia(item)}
        <CardBody>
          <Title style={{color: this.props.colors.white_color, textAlign: "center"}}>{item.title}</Title>
          <Copy style={{color: this.props.colors.white_color, textAlign: "center"}}>{item.description}</Copy>
        </CardBody>
        {this.renderBottomLink(item)}
        {this.renderDismissButton(index)}
      </Wrapper>
    )
  }

  render(){
    if(this.props.tutorial){
      if(this.props.tutorial.active == true){
        return(
          <ModalOverlay no_swipe={true} isVisible={true} onPress={()=>{
          }}>
            <Modal style={{
              flex: 1,
              alignSelf: "stretch",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Carousel
                items={this.props.tutorial.steps}
                renderItem={this.renderCarouselItem.bind(this)}
                include_pagination={true}
                dotColor={this.props.colors.white_color}
              />
            </Modal>
          </ModalOverlay>
        )
      }
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, settings }) => {
  const { token, user, tutorial } = auth;
  const { colors } = settings;

  return {
    token, user, tutorial, colors
  }
}

export default connect(mapStateToProps, {
  /*mobile*/
  getTutorial,
  completeTutorial
})(PopupTutorial);
