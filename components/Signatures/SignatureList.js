import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton } from 'app/NativeComponents/common';
import { List } from 'app/NativeComponents/snippets';

import SignatureItem from './SignatureItem';

class Body extends Component{


  render(){
    return (
      <Wrapper style={{flex: 1}}>
        <List
          rowNumber={1}
          style={{flex: 1}}
          items={this.props.signatures}
          infiniteScroll={false}
          itemStruture={({item}) => {
            return <SignatureItem
                    key={item.id}
                    signature={item}
                    onPress={()=>{
                      //SET Template
                      this.props.signatureInit({signature: item});
                      this.props.appRedirect({redirect: "editSignature", payload:{id: item.id}});
                    }}
                   />
          }}
          canRefresh={true}
          onRefresh={()=>{
            this.props.getSignatures({ token: this.props.token, type: "refresh" });
          }}
          is_refreshing={this.props.refreshing}
          canLoadMore={false}
          listFooter={()=>{
            return (
              <Card>
                <PrimaryButton onPress={()=>{
                  //set template blank
                  this.props.newSignature();
                }}>
                  Create New Signature
                </PrimaryButton>
              </Card>
            )
          }}
        />
      </Wrapper>
    );
  }

}

export default Body;
