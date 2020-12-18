import React, { Component } from 'react';
import {
  Wrapper,
  Row,
  Button,
  Stretch,
  InternalImage,
  ExternalImage,
  Icon
} from 'app/NativeComponents/common';

class PartnerLogos extends Component{


  render(){
    if(this.props.stats){
      if(this.props.stats.partner.id){
        if(this.props.stats.partner.id != 0 && this.props.stats.partner.white_image && this.props.stats.partner.white_image != ""){

          if(this.props.device == "mobile"){
            return (
              <Wrapper style={{borderBottomWidth: 1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid"}}>
                <Row style={{
                  justifyContent: 'center',
                  alignItems: "center"
                }}>
                  <Stretch style={{
                    padding: 10,
                    paddingTop: this.props.isIphoneX ?  20 : 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <InternalImage
                      style={{
                        height: 40,
                        width: "100%",
                        resizeMode: "contain",
                      }}
                      contain
                      image={this.props.device == "mobile" ? "" : this.props.dark_mode == "dark_mode" ? "/assets/images/dm_white_logo_medium.png" : "/assets/images/dm_white_logo_medium.png"}
                      source={this.props.device == "mobile" ? this.props.dark_mode == "dark_mode" ? require("app/assets/images/dm_white_logo_medium.png") : require("app/assets/images/dm_white_logo_medium.png") : null}
                    />
                  </Stretch>
                  <Stretch style={{
                    padding: 10,
                    paddingTop: this.props.isIphoneX ?  20 : 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <ExternalImage
                      style={{
                        height: 40,
                        width: "100%",
                        resizeMode: "contain",
                      }}
                      contain
                      image={this.props.dark_mode == "dark_mode" ? this.props.stats.partner.white_image ? this.props.stats.partner.white_image : this.props.stats.partner.white_image : this.props.stats.partner.white_image}
                    />
                  </Stretch>
                </Row>
              </Wrapper>
            );
          }else{
          if(!this.props.mobile_toggle_drawer){
            return(
              <Row>
                <Button

                onPress={()=>this.props.mobileToggleDrawer(!this.props.mobile_toggle_drawer)}
                style={{
                  width: 75,
                  height: 75,
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <InternalImage
                    style={{
                      height: 40,
                      width: "100%",
                      resizeMode: "contain",
                    }}
                    contain
                    image={this.props.device == "mobile" ? "" : this.props.dark_mode == "dark_mode" ? "/assets/images/Icon-white.png" : "/assets/images/Icon-white.png"}
                  />
                </Button>
                <Wrapper />
              </Row>
            )
          }else{
            return(
              <Wrapper style={{borderBottomWidth: 1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid"}}>
                <Row style={{
                  justifyContent: 'center',
                  alignItems: "center"
                }}>
                  <Stretch style={{
                    height: 75,
                    paddingRight: 10,
                    paddingLeft: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <InternalImage
                      style={{
                        height: 40,
                        width: "100%",
                        resizeMode: "contain",
                      }}
                      contain
                      image={this.props.device == "mobile" ? "" : this.props.dark_mode == "dark_mode" ? "/assets/images/dm_white_logo_medium.png" : "/assets/images/dm_white_logo_medium.png"}
                      source={this.props.device == "mobile" ? this.props.dark_mode == "dark_mode" ? require("app/assets/images/dm_white_logo_medium.png") : require("app/assets/images/dm_white_logo_medium.png") : null}
                    />
                  </Stretch>
                  <Wrapper style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10
                  }}>
                    <Icon
                      size={18}
                      icon={"add"}
                      color={this.props.colors.white_text_color}
                    />
                  </Wrapper>
                  <Stretch style={{
                    height: 75,
                    paddingRight: 10,
                    paddingLeft: 10,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <ExternalImage
                      style={{
                        height: 40,
                        width: "100%",
                        resizeMode: "contain",
                      }}
                      contain
                      image={this.props.dark_mode == "dark_mode" ? this.props.stats.partner.white_image ? this.props.stats.partner.white_image : this.props.stats.partner.white_image : this.props.stats.partner.white_image}
                    />
                  </Stretch>
                </Row>
              </Wrapper>
            )
          }
        }

        }
      }

    }

    return <Wrapper />

  }

}

export default PartnerLogos;
