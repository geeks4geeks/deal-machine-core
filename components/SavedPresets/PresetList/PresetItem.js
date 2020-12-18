import React from 'react';

import {
  Wrapper,
  Button,
  Copy,
  Bold,
  Row,
  Icon,
  Title
} from 'app/NativeComponents/common';

import {
  getCustomFilterText
} from 'app/NativeActions';

const renderDealFinderText = (use_for_dealfinders) => {
  if(use_for_dealfinders == 1){
    return (<Copy style={{fontSize: 12}}>Apply To DealFinders</Copy>);
  }
}

const PresetItem = (props) => {

  return(
    <Button onPress={props.onPress}>
      <Wrapper style={{
        padding: 15
      }}>
        <Row>
          <Icon
            size={18}

          />
          <Row>
            <Wrapper style={{
              padding: 15,
              alignItems: "flex-start",
              justifyContent: "center",
              alignSelf: "stretch"
            }}>
              <Icon
                icon={props.selected_team_filter ? props.selected_team_filter.id === props.filter.id ? "radio-button-checked" : "radio-button-unchecked" : "radio-button-unchecked"}
                size={22}
              />
            </Wrapper>
            <Wrapper style={{flex: 1}}>
              <Title>{props.filter.title}</Title>
              <Copy>{getCustomFilterText(props.filter.filter_json, props.toggle_highlight_filters)}</Copy>
              {renderDealFinderText(props.filter.use_for_dealfinders)}
            </Wrapper>
          </Row>
        </Row>

      </Wrapper>
    </Button>
  )
}


export default PresetItem;
