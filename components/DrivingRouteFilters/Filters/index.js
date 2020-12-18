import React, { Component } from "react";
import moment from "moment";

import {
  Card,
  Wrapper,
  Container,
  WebContainer,
  PrimaryButton,
  CardBody,
  Animation,
  Row
} from "app/NativeComponents/common";

import DateFilter from "./DateFilter";
import TeamRouteFilter from "./TeamRouteFilter";

import { Select, Header, MenuButton, PillButton } from "app/NativeComponents/snippets";

class Filters extends Component {

  constructor(props) {
    super(props);
    this.state = { isCalendarOpen: false };
  }

  componentDidMount() {
    this.props.initEditRouteFilters();
  }

  toggleCalendar() {
    this.setState(prevState => {
      return { isCalendarOpen: !prevState.isCalendarOpen };
    });
  }

  renderCalendarText() {
    if (
      this.props.editRouteFilters.start_date &&
      this.props.editRouteFilters.end_date
    ) {
      return (
        "Filter deals added between " +
        moment(this.props.editRouteFilters.start_date).format("MMM Do") +
        " and " +
        moment(this.props.editRouteFilters.end_date).format("MMM Do")
      );
    }
    return "No dates selected.";
  }

  renderButton() {
    if(this.props.checkIfNeedsToSave()){
      return (
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton
            primary={true}
            onPress={() => {
              this.props.saveRouteFilters();
              this.props.handleBack();
            }}
          >
            Update Route Filters
          </PillButton>
        </Row>
      );
    }

    return <Wrapper />;
  }

  render() {
    return (

      <Wrapper>
        <DateFilter
          {...this.props}
          isCalendarOpen={this.state.isCalendarOpen}
          toggleCalendar={this.toggleCalendar.bind(this)}
        />
        <TeamRouteFilter {...this.props} />

        <Card>
          <MenuButton
            onPress={() => {
              this.toggleCalendar();
            }}
            title={"Filter by date added"}
            text={this.renderCalendarText()}
            icon={"date-range"}
          />
        </Card>

        {this.renderButton()}
      </Wrapper>

    );
  }
}

export default Filters;
