import React, { Component } from "react";

import {
  Card,
  Gradient,
  CardBody,
  Container,
  Wrapper,
  CenterCenter,
  Spin,
  Title,
  Row,
  ExternalImage,
  Copy,
  Bold,
  ContentfulRichText,
  Button
} from "app/NativeComponents/common";

import {
  PillButton
} from "app/NativeComponents/snippets";


import {
  loadDashboardCaseStudies,
  textStyleFromContentful,
  openUrl
} from "app/NativeActions";

class CaseStudies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      caseStudies: [],
      random_number: 0
    }
  }

  componentDidMount() {
    this.setState(() => ({loading: true}));

    loadDashboardCaseStudies()
    .then((data) => {
      if (data && data.items) {


        let total_number = data.items.length - 1;
        let random_number = Math.floor(Math.random() * (total_number - 0 + 1) + 0);


        this.setState(() => ({
          caseStudies: data.items,
          random_number: random_number,
        }));
      }
      this.setState(() => ({loading: false}));
    })
    .catch((err) => {
      console.error(err);
      this.setState(() => ({loading: false}));
    });
  }

  renderButton(){
    if(this.state.caseStudies[this.state.random_number].fields.buttonText){
      return(
        <Row>
          <PillButton style={{margin: 0}} onPress={()=>{
            openUrl(this.state.caseStudies[this.state.random_number].fields.buttonLink)
          }}
          >
            {this.state.caseStudies[this.state.random_number].fields.buttonText}
          </PillButton>
        </Row>
      )
    }
  }

  render() {


    if (this.state.caseStudies.length <= 0) {
      return <Wrapper />;
    }


    return (
      <Card style={{overflow: "hidden"}}>
        <Gradient color1={this.props.colors.gradient_color_1} color2={this.props.colors.gradient_color_2}>
          <Row style={{
            alignItems: this.props.isMobile ? "flex-start" : "center"
          }}>
            <Wrapper style={{padding: 15, paddingRight: 0,
              alignItems: "center",
              justifyContent: "center"}}>
              <ExternalImage
                style={{
                  width: this.props.isMobile ? 80 : 120,
                  height: this.props.isMobile ? 80 : 120,
                  borderRadius: this.props.isMobile ? 40 : 60,
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: this.props.colors.white_color
                }}
                image={this.state.caseStudies[this.state.random_number].fields.image ? this.state.caseStudies[this.state.random_number].fields.image.fields.file.url : ""}
              />
            </Wrapper>

            <Wrapper style={{padding: 15, flex: 1}}>
              <Title style={{color: this.props.colors.white_text_color}}><Bold>{this.state.caseStudies[this.state.random_number].fields.title}</Bold></Title>
              <ContentfulRichText
                style={{color:this.props.colors.white_text_color}}
                richText={this.state.caseStudies[this.state.random_number].fields.description}
              />
              {this.renderButton()}

            </Wrapper>
          </Row>
        </Gradient>
      </Card>
    );
  }
}


export default CaseStudies;
