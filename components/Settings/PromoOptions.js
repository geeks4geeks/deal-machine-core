import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';

class PromoOptions extends Component{


  renderTrainingButton(){
    if(this.props.user.team_clearance_level == 0 && this.props.user_dealfinder_page.require_training == 1){
      return(
        <MenuItem
          to="/app/settings/training-videos"
          onPress={()=>this.props.appRedirect({redirect: "training"})}
          title="Training Videos"
          text="Re-watch all the training videos for your team"
        />
      )

    }
  }

  render(){


    if(this.props.user.team_owner == 1){
      return (
        <Card>

          <MenuItem
            style={{
              borderBottomWidth: 1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid"
            }}
            to="/app/badges"
            onPress={()=>{this.props.appRedirect({redirect: "badges"});}}
            title="Badges"
            text="Check out the badges you've earned!"
          />

          <MenuItem
            to="/app/settings/enter-promo"
            onPress={()=>this.props.appRedirect({redirect: "promo"})}
            title="Enter Promo"
            text="Enter a promo code for exclusive offers."
          />
        </Card>
      );
    }

    return (
      <Card>
        <MenuItem
          style={{
            borderBottomWidth: 1,
            borderBottomColor: this.props.colors.border_color,
            borderBottomStyle: "solid"
          }}
          to="/app/badges"
          onPress={()=>{this.props.appRedirect({redirect: "badges"});}}
          title="Badges"
          text="Check out the badges you've earned!"
        />
        {this.renderTrainingButton()}
      </Card>
    );


  }

}

export default PromoOptions;
