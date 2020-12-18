import React, { Component } from "react";

import {
  Card,
  CardBody,
  Container,
  Wrapper,
  CenterCenter,
  Spin,
  Title,
  Copy,
  ContentfulRichText,
  Icon,
  Row,
  Bold,
  Button
} from "app/NativeComponents/common";

import {
  PillButton
} from "app/NativeComponents/snippets";

import {
  loadDashboardUpcomingWebinars,
  textStyleFromContentful,
  formatDateTimeToLocal,
  openUrl
} from "app/NativeActions";

class UpcomingWebinars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      webinars: []
    }
  }

  componentDidMount() {
    this.setState(() => ({loading: true}));

    loadDashboardUpcomingWebinars()
    .then((data) => {
      if (data && data.items) {
        this.setState(() => ({
          webinars: data.items
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
    if(this.state.webinars[0].fields.buttonText){
      return(
        <Row>
          <PillButton primary={true} style={{margin: 0}} onPress={()=>{
            openUrl(this.state.webinars[0].fields.buttonLink)
          }}
          >
            {this.state.webinars[0].fields.buttonText}
          </PillButton>
        </Row>
      )
    }
  }

  render() {


    if (this.state.webinars.length <= 0) {
      return <Wrapper />;
    }

    return (
      <Card>
          <Wrapper style={{padding: 15, borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color, borderBottomStyle: "solid"}}>
            <Row>
              <Icon
                icon="event"
                size={26}
                style={{marginRight: 15}}
              />
              <Wrapper style={{flex: 1}}>
                <Title>
                  { this.state.webinars[0].fields.title }
                </Title>
                <Copy>
                  { formatDateTimeToLocal(this.state.webinars[0].fields.startAt) }
                </Copy>
              </Wrapper>
            </Row>
          </Wrapper>
          <CardBody>
            <ContentfulRichText
              richText={this.state.webinars[0].fields.description} />
            {this.renderButton()}
        </CardBody>
      </Card>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  webinarWrapper: {
    padding: 20
  },

  description: {
    marginTop: 10
  }
}

export default UpcomingWebinars;
