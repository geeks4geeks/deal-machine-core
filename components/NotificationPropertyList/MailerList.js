import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  Wrapper, Title, Copy, Spin, Row} from 'app/NativeComponents/common';
import { List } from 'app/NativeComponents/snippets';
import MailerItem from 'app/DealMachineCore/snippets/MailerItem';

class MailerList extends Component {

  render(){
    if(this.props.activity_properties_type.slug === "mailers_sent"){

      if(this.props.mailers_refreshing || (this.props.mailers_loading && this.props.mailers.length == 0 )){
        return(
          <Wrapper style={{padding: 20, alignItems: "center", justifyContent: "center"}}>
            <Row>
              <Spin size={"small"}/>
              <Copy style={{marginLeft: 10}}>Loading Mailers...</Copy>
            </Row>
          </Wrapper>
        )
      }
      if(this.props.mailers.length > 0){
        return(
          <List
            rowNumber={1}
            style={{flex: 1}}
            items={this.props.mailers}
            infiniteScroll={true}
            itemStruture={({item, i}) => {
              return <MailerItem
                        key={i}
                        onPropertyPress={()=>{
                          this.props.appRedirect({redirect: "property", payload:{property_id: "3"+item.lead_id, dashboard: this.props.isMobile ? false : true}})
                        }}
                        mailer={item}
                     />
            }}
            canRefresh={true}
            onRefresh={()=>{
              this.props.getProperties({
                load_type: "refresh"
              });
            }}
            is_refreshing={this.props.mailers_refreshing}
            canLoadMore={
              !this.props.mailers_loaded_all &&
              !this.props.mailers_loading &&
              !this.props.mailers_refreshing &&
              this.props.mailers.length > 0
            }
            isLoadingMore={
              this.props.mailers_loading &&
              !this.props.mailers_refreshing &&
              this.props.mailers.length > 0
            }
            onLoadMore={()=>{
              if(!this.props.mailers_loaded_all && this.props.mailers_refreshing != true && this.props.mailers_loading != true){
                this.props.getProperties({
                  load_type: "load_more",
                  begin: this.props.mailers_begin
                });
              }

            }}

          />
        )
      }

      if(this.props.mailers.length == 0){
        return(
          <Wrapper style={{padding: 20, alignItems: "center", justifyContent: "center"}}>
            <Title style={{textAlign:"center"}}>There is nothing to display.</Title>
            <Copy>There are no mailers to display.</Copy>
          </Wrapper>
        )
      }
    }

    return <Wrapper />;
  }
}

export default MailerList
