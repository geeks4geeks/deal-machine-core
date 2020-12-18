import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';

class NotificationOptions extends Component{


  render(){


    if(this.props.device == "mobile"){
      return (
        <Card>
          <MenuItem
            to="/app/settings/notifications"
            onPress={()=>this.props.appRedirect({redirect: "notifications"})}
            title="Notification Settings"
            text="Edit your push notification preferences."
          />
        </Card>
      );
    }

    return <Wrapper />;


  }

}

export default NotificationOptions;
