import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Row,
  Button,
  Copy,
  Bold,
  Icon
} from 'app/NativeComponents/common';

class DrivingTabs extends Component{

  render(){

    return (
      <Card>
        <Row>
          <Button onPress={()=>{
            this.props.selectActiveRoute(null);
            this.props.toggleTab("routes")
            if(this.props.device == "desktop"){
              this.props.appRedirect({redirect: "driving"});
            }
          }}
          style={{
            alignItems: "center",
            justifyContent:"center",
            flex: 1,
            backgroundColor: this.props.tab == "routes" ? this.props.colors.card_color : this.props.colors.gray_color,
            borderRightWidth: 1,
            borderRightColor: this.props.colors.border_color,
            borderRigthStyle: "solid"
          }}
          >
            <CardBody style={{padding:10}}>
              <Row>
                <Icon
                  fa_icon={"road"}
                  size={18}
                  style={{
                    marginRight: 5
                  }}
                />
                <Copy><Bold>Routes</Bold></Copy>
              </Row>
            </CardBody>
          </Button>

          <Button onPress={()=>{
            this.props.selectActiveTeamMember(null);
            this.props.toggleTab("dealfinders");
            if(this.props.device == "desktop"){
              this.props.appRedirect({redirect: "drivers"});
            }
          }}
          style={{
            alignItems: "center",
            justifyContent:"center",
            flex: 1,
            backgroundColor: this.props.tab == "dealfinders" ? this.props.colors.card_color : this.props.colors.gray_color
          }}
          >
          <CardBody style={{padding:10}}>
              <Row>
                <Icon
                  icon={"group"}
                  size={18}
                  style={{
                    marginRight: 5
                  }}
                />
                <Copy><Bold>{this.props.user.team_clearance_level == 0 ? "Team" : "Drivers"}</Bold></Copy>
              </Row>
            </CardBody>
          </Button>
        </Row>
      </Card>
    );
  }


}

export default DrivingTabs;
