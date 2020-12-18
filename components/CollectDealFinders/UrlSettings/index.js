import React, { Component } from 'react';
import { Wrapper, Card, Row, CardBody, Input, Copy, Button } from 'app/NativeComponents/common';
import { CardLabel, ToggleSwitch } from 'app/NativeComponents/snippets';

import {
  openUrl,
  showSuccess
} from 'app/NativeActions';

class UrlSettings extends Component{

  renderPreviewLink(){
    if(this.props.user_dealfinder_page && !this.props.checkIfNeedsToSave() && this.props.edit_live_page == "on"){
      if(this.props.user_dealfinder_page.team_link != "" && this.props.user_dealfinder_page.team_link != null){
        return(
          <Row style={{
            justifyContent: "flex-end"
          }}>
            <Button onPress={()=>{
              openUrl("https://dealmachine.com/team/"+this.props.user_dealfinder_page.team_link+"?preview=true")
            }}>
              <Copy>
                Preview Page
              </Copy>
            </Button>
          </Row>
        )
      }
    }
  }


  render(){
    return(
      <Wrapper>
        {
          this.renderPreviewLink()
        }
        <Card>
          <CardLabel
            title={"URL Settings:"}
            fa_icon={"globe"}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
          <ToggleSwitch
            style={{
              borderBottomWidth: 1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid"
            }}
            value={this.props.edit_live_page == "on" ? true : false}
            onChange={value => {
              //change approveDeals
              this.props.editTeamLink({ prop: "edit_live_page", value: value == true ? "on" : "off" })
            }}
            title={"Set Page Live"}
            text={"Set your DealFinder page live?"}
          />

          <Row>
            <CardBody>
              <Copy selectable={true}>
                {this.props.dealfinder_page_defaults.team_link_host+this.props.edit_team_link}
              </Copy>
            </CardBody>
            <Input
              ref="invite_link"
              name="invite_link"
              returnKeyType="done"
              blurOnSubmit={true}
              autoCapitalize="none"
              blurOnSubmit={true}
              autoCapitalize="none"
              keyboardType="default"
              placeholder="<Custom Link>"
              onChange={value => this.props.editTeamLink({ prop: "edit_team_link", value })}
              value={this.props.edit_team_link ? this.props.edit_team_link : ""}
              type="text"
            />
          </Row>
        </Card>
      </Wrapper>
    )
  }
}

export default UrlSettings;
