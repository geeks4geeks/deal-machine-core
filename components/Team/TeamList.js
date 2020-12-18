import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Title, Copy } from 'app/NativeComponents/common';
import { List, PillButton } from 'app/NativeComponents/snippets';

import TeamMemberItem from './TeamMemberItem';
import InviteTeamMemberCard from './InviteTeamMemberCard';
class TeamMemberList extends Component{

  render(){
    return (
      <Wrapper>
        <InviteTeamMemberCard {...this.props}/>
        <Card>
          <List
            rowNumber={1}
            style={{flex: 1}}
            items={this.props.team_members}
            infiniteScroll={true}
            itemStruture={({item}) => {
              return <TeamMemberItem
                      key={item.id}
                      member={item}
                      colors={this.props.colors}
                      active_team_member={this.props.active_team_member}
                      onPress={()=>{
                        if(item.member_type == "invite"){
                          this.props.selectActiveTeamMember(item);
                          this.props.appRedirect({redirect: "invite", payload: {id: item.id}})
                        }else{
                          this.props.selectActiveTeamMember(item);
                          this.props.appRedirect({redirect: "user", payload: {id: item.id}})
                        }
                      }}
                     />
            }}
            canRefresh={true}
            onRefresh={()=>{
              this.props.getTeamMembers({
                token: this.props.token,
                load_type: "refresh",
                type: "team_members",
                begin: 0,
                search: this.props.team_members_search
              });
            }}
            is_refreshing={this.props.team_members_refreshing}
            canLoadMore={
              !this.props.team_members_loaded_all &&
              !this.props.team_members_loading &&
              !this.props.team_members_refreshing &&
              this.props.team_members.length > 0
            }
            isLoadingMore={
              this.props.team_members_loading &&
              !this.props.team_members_refreshing &&
              this.props.team_members.length > 0
            }
            onLoadMore={()=>{
              if(!this.props.team_members_loaded_all && this.props.team_members_refreshing != true && this.props.team_members_loading != true){
                this.props.getTeamMembers({
                  token: this.props.token,
                  load_type: "load_more",
                  type: "team_members",
                  begin: this.props.team_members_begin,
                  search: this.props.team_members_search
                });
              }
            }}
          />
        </Card>
      </Wrapper>
    );
  }

}

export default TeamMemberList;
