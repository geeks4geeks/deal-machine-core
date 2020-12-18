import React, { Component } from "react";

import {
  Wrapper,
  Card,
  CardBody,
  PrimaryButton,
  Title,
  Input,
  Copy,
  Bold,
  Spin,
  Row
} from "app/NativeComponents/common";

import { TextButton, RangePicker } from "app/NativeComponents/snippets";

class LeadInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lead_price: 0,
      total_price: 0
    };
  }

  componentDidMount() {
    this.setState({
      lead_price: 0.1,
      total_price: 0.1 * this.props.pause_plan_info.deal_count
    });
  }

  sellMyLeads() {
    this.props.setModal({
      title: "Sell My Leads",
      description:
        <Copy>An email will be sent to {this.props.user.email}
        <Bold> if they're interested</Bold> in purchasing your leads</Copy>,
      icon: "",
      submit: "Sell Leads",
      onPress: () => {
        this.props.sellLeads({
          token: this.props.token,
          type: "sell_leads",
          sell_leads_price: this.state.lead_price * 100,
          leads_count: this.props.pause_plan_info.deal_count
        });
      },
      cancel: "Nevermind.",
      onCancel: () => {
        this.props.cancelSellLeads();
      }
    });
    this.props.toggleModal({ show: true, type: "normal" });
  }

  render() {
    return (
      <Wrapper>
        <Card>
          <CardBody>
            <Row style={{ justifyContent: "center" }}>
              <Title>
                {this.props.pause_plan_info.deal_count} leads x $
                {this.state.lead_price.toFixed(2)} each = $
                {this.state.total_price.toFixed(2)} sent to you
              </Title>
            </Row>
          </CardBody>
        </Card>
        <CardBody>
          <Copy>
            Note: Your leads may be worth more if they have photos, were added
            during route tracking on and if they have tags.
          </Copy>
        </CardBody>
        <Card>
          <PrimaryButton
            onPress={() => {
              this.sellMyLeads();
            }}
          >
            Yes, put my leads up for sale
          </PrimaryButton>
        </Card>
        <TextButton
          onPress={() => {
            this.props.appRedirect({redirect: "goBack", payload: {remove: "sell-leads"}});
          }}
          text={"No, I'm not interested right now"}
        />
      </Wrapper>
    );
  }
}

export default LeadInfo;
