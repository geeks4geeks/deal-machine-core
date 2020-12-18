import React, { Component } from 'react';
import { Wrapper, CardBody, Title, Bold } from 'app/NativeComponents/common';

class Slogan extends Component{


  render(){


    if(this.props.platform == "ios"){
      return(
        <Wrapper style={{
          flex: 1,
          justifyContent: "center",
          maxWidth: 700
        }}>

          <CardBody>
            <Title style={{
              color: this.props.colors.white_text_color,
              fontSize: this.props.device == "desktop" ? 42 : 28,
              lineHeight: this.props.device == "desktop" ? "48px" : 32,
              marginBottom:10,
              textAlign: "center"
            }}>
              <Bold>We're here for you</Bold>
            </Title>
            <Title style={{
              color: this.props.colors.white_text_color,
              fontSize: this.props.device == "desktop" ? 20 : 16,
              lineHeight: this.props.device == "desktop" ? "24px" : 18,
              textAlign: "center"
            }}>
            You can't sign up for DealMachine in the app. We know it's a hassle. Join and come back to start finding real-estate deals.
            </Title>
          </CardBody>
        </Wrapper>
      )
    }

    return (
      <Wrapper style={{
        flex: 1,
        justifyContent: "center",
        maxWidth: 700
      }}>
        <CardBody>
          <Title style={{
            color: this.props.colors.white_text_color,
            fontSize: this.props.device == "desktop" ? 42 : 28,
            lineHeight: this.props.device == "desktop" ? "48px" : 32,
            marginBottom:10
          }}>
            The most <Bold>complete driving tool</Bold> for <Bold>real estate investors</Bold> on the market
          </Title>
          <Title style={{
            color: this.props.colors.white_text_color,
            fontSize: this.props.device == "desktop" ? 20 : 16,
            lineHeight: this.props.device == "desktop" ? "24px" : 18,
          }}>
            Find off-market deals and contact any property owner via direct mail, email, and phone with a single click.
          </Title>
        </CardBody>
      </Wrapper>
    );

  }

}

export default Slogan;
