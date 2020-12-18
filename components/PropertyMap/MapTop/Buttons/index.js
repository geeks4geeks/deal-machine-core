import React, {PureComponent} from 'react';
import {
  Wrapper,
  Row
} from 'app/NativeComponents/common';

import MapModeButton from './MapModeButton';

import MapOptionsToggleButton from './MapOptionsToggleButton';
import MapZoomControl from './MapZoomControl';
import HighlightFiltersButton from './HighlightFiltersButton';

import {
  checkIfUserHasModule
} from 'app/NativeActions';
class Buttons extends PureComponent{

  constructor(props){
    super(props);
    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "driving"})
    this.state = {
      plan_module_info: plan_module_info
    }
  }

  render(){
    return (
      <Wrapper style={{
        width: "100%",
        alignItems: "space-between",
        justifyContent: "center"
      }}>
        <Row>
          <Row style={{flex: 1, alignItems: "flex-start", justifyContent: "flex-start"}}>
            <MapModeButton
              map_mode={this.props.map_mode}
              toggleActionSheet={this.props.toggleActionSheet}
              device={this.props.device}
              isMobile={this.props.isMobile}
              plan_module_info={this.state.plan_module_info}
              colors={this.props.colors}
              user={this.props.user}
            />
          </Row>
          <Row style={{flex: 1, justifyContent: "flex-end"}}>
            <HighlightFiltersButton
              user={this.props.user}
              appRedirect={this.props.appRedirect}
              toggleHighlightFilters={this.props.toggleHighlightFilters}
              resetEditedFilters={this.props.resetEditedFilters}
              applied_team_filter={this.props.applied_team_filter}
              selectTeamFilter={this.props.selectTeamFilter}
            />
            <MapOptionsToggleButton
              appRedirect={this.props.appRedirect}
            />
            <MapZoomControl
              handleZoomControl={this.props.handleZoomControl}
              isMobile={this.props.isMobile}
              device={this.props.device}
            />
          </Row>
        </Row>
      </Wrapper>
    )
  }
}


export default Buttons;
