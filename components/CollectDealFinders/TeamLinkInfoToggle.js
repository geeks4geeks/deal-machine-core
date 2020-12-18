import React, { Component } from 'react';
import { Wrapper, Card, Row, Button, Icon, CardBody, Bold, Copy } from 'app/NativeComponents/common';


class TeamLinkInfoToggle extends Component{

  render(){
    if(this.props.edit_live_page == "on"){

      return(
        <Card style={{overflow: "hidden", borderWidth: 1, borderColor: this.props.colors.border_color}}>
          <Row >
            <Button onPress={()=>{
              this.props.editTeamLink({ prop: "edit_team_link_toggle", value: "site" })

            }}
            style={{
              alignItems: "center",
              justifyContent:"center",
              flex: 1,
              backgroundColor:
                this.props.edit_team_link_toggle == "site" ? this.props.colors.card_color : this.props.colors.gray_color
            }}
            >
              <CardBody style={{padding:this.props.device == "desktop" ? 10 : 20}}>
                <Row>
                  <Icon
                    icon={"info"}
                    size={18}
                    style={{
                      marginRight: 5
                    }}
                  />
                  <Copy><Bold>Landing Page Info</Bold></Copy>
                </Row>
              </CardBody>
            </Button>

            <Button onPress={()=>{
              this.props.editTeamLink({ prop: "edit_team_link_toggle", value: "videos" })
            }}
            style={{
              alignItems: "center",
              justifyContent:"center",
              flex: 1,
              backgroundColor: this.props.edit_team_link_toggle == "videos" ? this.props.colors.card_color : this.props.colors.gray_color
            }}
            >
            <CardBody style={{padding:this.props.device == "desktop" ? 10 : 20}}>
                <Row>
                  <Icon
                    icon={"videocam"}
                    size={18}
                    style={{
                      marginRight: 5
                    }}
                  />
                  <Copy><Bold>Training Videos</Bold></Copy>
                </Row>
              </CardBody>
            </Button>

            <Button onPress={()=>{
              this.props.editTeamLink({ prop: "edit_team_link_toggle", value: "email" })
            }}
            style={{
              alignItems: "center",
              justifyContent:"center",
              flex: 1,
              backgroundColor: this.props.edit_team_link_toggle == "email" ? this.props.colors.card_color : this.props.colors.gray_color
            }}
            >
              <CardBody style={{padding:this.props.device == "desktop" ? 10 : 20}}>
                <Row>
                  <Icon
                    icon={"email"}
                    size={18}
                    style={{
                      marginRight: 5
                    }}
                  />
                  <Copy><Bold>Welcome Email</Bold></Copy>
                </Row>
              </CardBody>
            </Button>
          </Row>
        </Card>
      )


    }



    return <Wrapper />
  }
}

export default TeamLinkInfoToggle;
