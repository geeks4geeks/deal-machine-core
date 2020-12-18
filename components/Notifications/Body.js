import React, { Component } from 'react';
import { Wrapper, Card, Row } from 'app/NativeComponents/common';
import { ToggleSwitch, PillButton } from 'app/NativeComponents/snippets';

class Body extends Component{



renderButton(){

  if(this.props.checkIfNeedsToSave()){
    return(
      <Row style={{justifyContent: "flex-end"}}>
        <PillButton
        primary={true}
        onPress={() =>{
          this.props.updateUserNotification();
        }}
        >
        Save Notification Settings
        </PillButton>
      </Row>
    );
  }

}

render(){



    return (
      <Wrapper>

        <Card>

          {
            this.props.notification_array.map((notification, i)=>{
              return(

                <ToggleSwitch
                  key={i}
                  onChange={value => {
                    this.props.changeNotification(notification.id);
                  }}
                  id = {notification.id}
                  value={notification.notification_off == 1 ? false : true}
                  title={notification.title}
                  text={notification.description}
                />
              )
            })
          }
        </Card>

        {this.renderButton()}

      </Wrapper>
    );
  }

}

export default Body;
