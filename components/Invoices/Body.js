import React, { Component } from "react";

import {
  Wrapper,
  Card,
  CardBody,
  Title,
  Copy,
  Spin,
  ModalContainer,
  WebContainer,
  Spinner,
  StatusBarStyle,
  Animation
} from "app/NativeComponents/common";

import { openUrl, AppConfig } from "app/NativeActions";

import { Header } from "app/NativeComponents/snippets";

import {
  List,
  CardLabel,
  DateRangePicker
} from "app/NativeComponents/snippets";

import InvoiceCharges from "./InvoiceCharges";
import InvoiceList from "./InvoiceList";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCalendarOpen: false,
      start_date: null,
      end_date: null

    };
  }

  handleBack() {
    this.props.appRedirect({
      redirect: "goBack",
      payload: { type: "billing" }
    });
  }

  toggleCalendar() {
    this.setState(prevState => {
      return { isCalendarOpen: !prevState.isCalendarOpen };
    });
  }

  exportInvoiceString() {
    var export_string = "";
    if (this.props.start_date == null && this.props.end_date == null) {
      export_string =
        "credits/?token=" +
        this.props.token +
        "&type=invoices&export_type=csv";
    } else {
      export_string =
        "credits/?token=" +
        this.props.token +
        "&type=invoices&export_type=csv&&start_date=" +
        this.props.start_date +
        "&end_date=" +
        this.props.end_date;
    }
    return export_string;
  }

  render() {
    if (this.props.invoices.length > 0) {
      return (
        <ModalContainer>
          <Animation type="fadeIn">
            <Header
              title={"Invoices"}
              leftButtonIcon={"arrow-back"}
              leftButtonAction={this.handleBack.bind(this)}
              rightButtonIcon={"date-range"}
              rightButtonAction={this.toggleCalendar.bind(this)}
              rightButtonIcon2={"cloud-download"}
              rightButtonAction2={() => {
              openUrl(AppConfig().api_url + this.exportInvoiceString());

              }}
            />
          </Animation>

          <WebContainer>
            <DateRangePicker
              {...this.props}
              isCalendarOpen={this.state.isCalendarOpen}
              toggleCalendar={this.toggleCalendar.bind(this)}
              selectDates={({ start_date, end_date }) => {

                this.props.getInvoices({
                  token: this.props.token,
                  begin: 0,
                  type: "invoices",
                  team: this.props.user.team_id,
                  start_date: start_date,
                  end_date: end_date
                });
              }}
            />

            <InvoiceList
              toggleCalendar={this.toggleCalendar.bind(this)}
              isCalendarOpen={this.state.isCalendarOpen}
              {...this.props}
            />
          </WebContainer>
        </ModalContainer>
      );
    } else if (this.props.invoices_refreshing || this.props.invoices_loading) {
      return (
        <ModalContainer>
          <Animation type="fadeIn">
            <Header
              title={"Invoices"}
              leftButtonIcon={"arrow-back"}
              leftButtonAction={this.handleBack.bind(this)}
              rightButtonIcon={"date-range"}
              rightButtonAction={this.toggleCalendar.bind(this)}
              rightButtonIcon2={"cloud-download"}
              rightButtonAction2={() => {
                openUrl(
                  AppConfig().api_url +
                    "invoices/?token=" +
                    this.props.token +
                    "&type=export"
                );
              }}
            />
          </Animation>

          <WebContainer>
            <DateRangePicker
              {...this.props}
              isCalendarOpen={this.state.isCalendarOpen}
              toggleCalendar={this.toggleCalendar.bind(this)}
            />
            <Wrapper style={{ flex: 1 }}>
              <Wrapper
                style={{
                  alignItems: "center",
                  justifyContent: "flex-start",
                  alignSelf: "stretch",
                  flex: 1
                }}
              >
                <CardBody>
                  <Spin />
                </CardBody>
              </Wrapper>
            </Wrapper>
          </WebContainer>
        </ModalContainer>
      );
    }
    return (
      <ModalContainer>
        <Header
          title={"Invoices"}
          leftButtonIcon={"arrow-back"}
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={"date-range"}
          rightButtonAction={this.toggleCalendar.bind(this)}
        />

        <WebContainer>
          <DateRangePicker
            {...this.props}
            isCalendarOpen={this.state.isCalendarOpen}
            toggleCalendar={this.toggleCalendar.bind(this)}
          />
          <Wrapper>
            <CardBody
              style={{
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Title style={{ textAlign: "center" }}>No Invoices Found</Title>
              <Copy style={{ textAlign: "center" }}>
                It doesn't look like there are any invoices to display based on
                your search parameters.
              </Copy>
            </CardBody>
          </Wrapper>
        </WebContainer>
      </ModalContainer>
    );
  }
}

export default Body;
