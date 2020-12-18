import React, { Component } from 'react';

import { Wrapper, Card } from 'app/NativeComponents/common';

import {
  List,
  CardLabel,
  DateRangePicker
} from 'app/NativeComponents/snippets';

import Invoice from './Invoice';
import InvoiceCharges from './InvoiceCharges';

class InvoiceList extends Component{

  render(){
      return(
        <Wrapper style={{flex: 1}}>
            <List
              rowNumber={1}
              style={{flex: 1}}
              items={this.props.invoices}
              infiniteScroll={true}
              listHeader={()=>{return <InvoiceCharges {...this.props}/>}}
              itemStruture={({item}) => {
                return (
                  <Card style={{
                    flex: 1,
                    marginTop: 0
                  }}>
                    <Invoice
                      key={item.id}
                      invoice={item}
                      device={this.props.device}
                      {...this.props}
                     />
                  </Card>
                )
              }}
              canRefresh={true}
              onRefresh={()=>{
                this.props.getInvoices({
                  token: this.props.token,
                  type: "refresh_invoices",
                  begin: 0
                });
              }}
              is_refreshing={this.props.invoices_refreshing}
              canLoadMore={
                !this.props.invoices_loaded_all &&
                !this.props.invoices_loading &&
                !this.props.invoices_refreshing &&
                this.props.invoices.length > 0
              }
              isLoadingMore={
                this.props.invoices_loading &&
                !this.props.invoices_refreshing &&
                this.props.invoices.length > 0
              }
              onLoadMore={()=>{
                if(!this.props.invoices_loaded_all && this.props.invoices_refreshing != true && this.props.invoices_loading != true){
                  this.props.getInvoices({
                    token: this.props.token,
                    type: "load_more_invoices",
                    begin: this.props.begin
                  });
                }
              }}
            />
        </Wrapper>
      );
  }

}

export default InvoiceList;
