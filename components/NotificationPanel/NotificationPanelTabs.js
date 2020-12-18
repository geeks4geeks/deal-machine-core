import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Row, Button, Icon, Copy, Bold } from 'app/NativeComponents/common';

class NotificationPanelTabs extends Component{


  render(){

    return (
      <Card>
        <Row>
          <Button onPress={()=>{
            this.props.switchNotifcationPanelTab("tasks");

          }}
          style={{
            alignItems: "center",
            justifyContent:"center",
            flex: 1,
            backgroundColor: this.props.notification_panel_tab == "tasks" ? this.props.colors.card_color : this.props.colors.gray_color,
            borderRightWidth: 1,
            borderRightColor: this.props.colors.border_color,
            borderRigthStyle: "solid"
          }}
          >
            <CardBody style={{padding:10}}>
              <Row>
                <Icon
                  icon={"check-box"}
                  size={18}
                  style={{
                    marginRight: 5
                  }}
                />
                <Copy><Bold>Success Steps</Bold></Copy>
              </Row>
            </CardBody>
          </Button>

          <Button onPress={()=>{
            this.props.switchNotifcationPanelTab("activity");
          }}
          style={{
            alignItems: "center",
            justifyContent:"center",
            flex: 1,
            backgroundColor: this.props.notification_panel_tab == "activity" ? this.props.colors.card_color : this.props.colors.gray_color
          }}
          >
          <CardBody style={{padding:10}}>
              <Row>
                <Icon
                  icon={"notifications"}
                  size={18}
                  style={{
                    marginRight: 5
                  }}
                />
                <Copy><Bold>Activity</Bold></Copy>
              </Row>
            </CardBody>
          </Button>
        </Row>
      </Card>
    )

  }

}

export default NotificationPanelTabs;
