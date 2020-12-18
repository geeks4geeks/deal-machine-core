import React, { Component } from 'react';

import {
  Wrapper,
  Card,
  CardBody,
  Row,
  Copy,
  Bold,
  Title,
  Spin,
  Button,
  Icon
} from 'app/NativeComponents/common';

import {
  PillButton
} from 'app/NativeComponents/snippets';

class ListLeadCount extends Component{

  constructor(props){
    super(props);

    this.state = {
      show_breakdown: false
    }
  }

  toggleBreakdown(toggle){
    this.setState({
      show_breakdown: toggle
    })
  }

  renderLeadsCard(){
    if(this.props.isMobile){
      return(
        <Row>
          <Wrapper style={{flex: 1}}>
            <Title>Leads in list: <Bold>{this.props.active_list.lead_count}</Bold></Title>
            <Button onPress={()=>{this.toggleBreakdown(!this.state.show_breakdown)}}>
              <Row>

                <Copy>{this.state.show_breakdown ? "Hide Breakdown" : "Show Breakdown"}</Copy>
                <Icon
                  size={18}
                  style={{marginLeft: 5}}
                  icon={this.state.show_breakdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                />
              </Row>
            </Button>
          </Wrapper>


          <PillButton primary={true} onPress={()=>{
            //set lead filter
            this.props.clearAllLeadFilters();
            this.props.updateListFilter([this.props.active_list]);
            this.props.appRedirect({
              redirect: "leads_push"
            });

          }}>
            View Leads
          </PillButton>
        </Row>
      )
    }

    return(
      <Row>
        <Wrapper style={{flex: 1}}>
          <Title>Leads in list: <Bold>{this.props.active_list.lead_count}</Bold></Title>
        </Wrapper>
        <Button style={{alignItems: "center", justifyContent: "center", marginLeft: 10, marginRight: 10}} onPress={()=>{this.toggleBreakdown(!this.state.show_breakdown)}}>
          <Row>

            <Copy>{this.state.show_breakdown ? "Hide Breakdown" : "Show Breakdown"}</Copy>
            <Icon
              size={18}
              style={{marginLeft: 5}}
              icon={this.state.show_breakdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            />
          </Row>
        </Button>
        <PillButton primary={true} onPress={()=>{
          //set lead filter
          this.props.clearAllLeadFilters();
          this.props.updateListFilter([this.props.active_list]);
          this.props.appRedirect({
            redirect: "leads_push"
          });

        }}>
          View Leads
        </PillButton>
      </Row>
    )
  }

  render(){
    if(this.props.edit_active_list){

      if(this.props.loading_single_list_item){
        return(
          <Card>
            <Wrapper style={{padding: 15}}>
              <Row>
                <Spin size="small"/>
                <Copy style={{marginLeft: 5}}>Loading information...</Copy>
              </Row>
            </Wrapper>
          </Card>
        )
      }
      if(this.props.edit_active_list.analytics){
        if(this.props.edit_active_list.analytics.length > 0){
          return(
            <Card>
              <Wrapper style={{
                padding: 15
              }}>
                {this.renderLeadsCard()}
              </Wrapper>

              <Row style={{
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                paddingBottom: this.state.show_breakdown ? 15 : 0
              }}>
                {
                  this.state.show_breakdown && this.props.edit_active_list.analytics.map((status, i)=>{
                    //if(status.lead_count > 0){
                      return(
                        <Wrapper
                        key={i}
                        style={{
                          width: "50%"
                        }}>
                          <Wrapper style={{padding: 5, paddingRight: 15, paddingLeft: 15}}>
                            <Copy>{status.title}: <Bold>{status.lead_count}</Bold></Copy>
                          </Wrapper>

                        </Wrapper>
                      )
                    //}

                  })
                }
                </Row>

            </Card>
          )
        }
      }

    }

    return <Wrapper />;
  }

}

export default ListLeadCount;
