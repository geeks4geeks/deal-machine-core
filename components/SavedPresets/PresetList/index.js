import React, { Component } from 'react';

import {
  Wrapper, Button, Copy, Row, Icon, Card, Spin, Bold, Title
} from 'app/NativeComponents/common';
import { List, PillButton } from 'app/NativeComponents/snippets';

import PresetItem from './PresetItem';

class PresetList extends Component {

  render() {
    if(this.props.team_filters.length === 0 && this.props.team_filters_loading){
      return(
        <Wrapper style={{padding: 20, alignItems: "center", justifyContent: "center"}}>
          <Row>
            <Spin size="small"/>
            <Copy style={{marginLeft: 10}}>Loading presets...</Copy>
          </Row>
        </Wrapper>
      )
    }

    if(this.props.team_filters.length === 0){
      return (

        <Wrapper>
          <Wrapper style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Title style={{
              textAlign: "center"
            }}>
              You have no presets
            </Title>
            <Copy style={{
              textAlign: "center"
            }}>Would you like to create one?</Copy>
            <Row style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20
            }}>
              <PillButton primary={true} onPress={()=>{
                this.props.createPreset();
              }}>
                Create Preset
              </PillButton>
            </Row>
          </Wrapper>
        </Wrapper>

      );
    }

    if(this.props.team_filters.length > 0 && !this.props.team_filters_loading){
      return (
        <Card>
          <List
            rowNumber={1}
            style={{flex: 1}}
            items={this.props.team_filters}
            infiniteScroll={true}
            refreshing={false}

            itemStruture={({item}) => {
              return <PresetItem
                        key={item.id}
                        onPress={()=>{
                          this.props.selectTeamFilter(item)
                          this.props.editFilterTitle(item.title)
                          this.props.handleBack();
                        }}
                        filter={item}
                        selected_team_filter={this.props.selected_team_filter}
                        toggle_highlight_filters={this.props.toggle_highlight_filters}
                     />
            }}
            canLoadMore={false}
          />
        </Card>
      )
    }

    return <Wrapper />
  }

}


export default PresetList;
