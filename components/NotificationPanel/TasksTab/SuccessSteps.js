import React, { Component } from "react";

import {
  Container,
  Scroll,
  Spin,
  CenterCenter,
  Title,
  Wrapper,
  Copy,
  Bold,
  Card,
  ContentfulRichText
} from "app/NativeComponents/common";

import {
  loadDashboardSuccessSteps,
  textStyleFromContentful
} from "app/NativeActions";

class SuccessSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: null,
      titleStyle: {},
      stepTitleStyle: {},
      stepDescriptionStyle: {},
      steps: []
    }
  }

  componentDidMount() {
    this.setState(() => ({loading: true}));

    loadDashboardSuccessSteps()
    .then((data) => {
      if (data && data.items && data.items.length > 0) {
        this.setState(() => ({
          title: data.items[0].fields.title,
          titleStyle: textStyleFromContentful(data.items[0].fields.titleStyle),
          stepTitleStyle: textStyleFromContentful(data.items[0].fields.stepTitleStyle),
          stepDescriptionStyle: textStyleFromContentful(data.items[0].fields.stepDescriptionStyle),
          steps: data.items[0].fields.steps
        }));
      }
      this.setState(() => ({loading: false}));
    })
    .catch((err) => {
      console.error(err);
      this.setState(() => ({loading: false}));
    });
  }

  renderSteps() {
    let comps = [];

    this.state.steps.forEach((step) => {
      comps.push(
        <Wrapper style={{marginBottom:20}} key={"success-step-" + step.fields.step} className="success-steps">
          <Wrapper style={{marginBottom:10}}>
            <Copy><Bold>{step.fields.step}. {step.fields.title}</Bold></Copy>
          </Wrapper>
          <Wrapper>
            <ContentfulRichText richText={step.fields.description} />
          </Wrapper>
        </Wrapper>
      );
    });

    return comps;
  }

  render() {


    return (
      <Wrapper>
        {
          this.state.steps.length > 0 && [
            <Card style={{padding:20}}>
              { this.renderSteps() }
            </Card>
          ]
        }
      </Wrapper>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  title: {
    marginTop: 30,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 0
  },

  bodyContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
}

export default SuccessSteps;
