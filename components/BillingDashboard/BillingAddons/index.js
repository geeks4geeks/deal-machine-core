import React, { Component } from 'react';
import{
  Wrapper,
  Card,
  Title
} from 'app/NativeComponents/common';

import{
  PillButton
} from 'app/NativeComponents/snippets';

import {
  renderPrice
} from 'app/NativeActions';

import BillingAddonItem from './BillingAddonItem';

class BillingAddons extends Component{

  render(){
    if(this.props.platform != "ios" && this.props.billing_addons){
      if((this.props.user.team_clearance_level > 0 || this.props.user.team_owner == 1) && this.props.billing_addons.length > 0){
        return(
          <Wrapper>
            <Wrapper style={{padding: 20}}>
              <Title>Add-ons: </Title>
            </Wrapper>
            <Card>
              {
                this.props.billing_addons.map((addon, i)=>{

                  var price = "";
                  if(this.props.billing_frequency == "annually"){
                    price = "$"+parseInt(addon.yearly_price)/100;
                  }else{
                    price = "$"+parseInt(addon.monthly_price)/100;
                  }

                   return (
                      <BillingAddonItem
                        key={i}
                        addon={addon}
                        price={price}
                        colors={this.props.colors}
                        current_plan_frequency={this.props.billing_frequencyy}
                        onPurchaseItem={()=>{

                          //show pop up to confirm purcahse and explain how they'll be charged
                          if(this.props.card_info.has_card){
                            this.props.setModal({
                              title: "Add product",
                              description: 'Are you sure you want to add this product? You will receive a pro rated charge today. On your next billing cycle you will be charged '+price+".",
                              icon: "check",
                              submit: 'Confirm Purchase',
                              onPress: ()=>{
                                this.props.updateBillingAddon({
                                  token: this.props.token,
                                  type: "purchase",
                                  slug: addon.slug,
                                  addon_id: addon.id
                                })
                              },
                              cancel: 'Not right now',
                              onCancel: ()=>{}
                            });
                            this.props.toggleModal({show: true, type: "normal"});
                          }else{
                            this.props.appRedirect({redirect: "cardOnFile"});
                          }

                        }}
                        onCancelItem={()=>{
                          //show pop up to confirm cancel
                          this.props.setModal({
                            title: "Cancel Product",
                            description: 'Are you sure you want to cancel this product? You will no longer have access and any automations will turn off.',
                            icon: "error",
                            submit: 'Confirm Cancelation',
                            buttonType: "destroy",
                            onPress: ()=>{
                              //trigger cancelBillingAddon
                              this.props.updateBillingAddon({
                                token: this.props.token,
                                type: "cancel",
                                addon_id: addon.id,
                                slug: addon.slug
                              })
                            },
                            cancel: 'Not right now',
                            onCancel: ()=>{}
                          });
                          this.props.toggleOnboarding(true)
                          this.props.toggleModal({show: true, type: "normal"});

                        }}
                      />
                   );
                })
              }
            </Card>

          </Wrapper>
        )
      }
    }

    return <Wrapper />;

  }

}


export default BillingAddons;
