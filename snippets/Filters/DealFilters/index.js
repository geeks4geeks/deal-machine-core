import React, { Component } from 'react';

import { Wrapper, Card } from 'app/NativeComponents/common';

import ListsFilter from './ListsFilter';
import DealStatusFilter from './DealStatusFilter';
import TagFilter from './TagFilter';
import AddedByFilter from './AddedByFilter';
import DateAddedFilter from './DateAddedFilter';

import MailTemplateFilter from './MailTemplateFilter';
import CampaignFilter from './CampaignFilter';
import TimesMailed from './TimesMailed';
import IncludeImage from './IncludeImage';
import DidSkipTrace from './DidSkipTrace';
import SendingQueueFilter from './SendingQueueFilter';
class DealFilters extends Component {

  constructor(props){
    super(props);

    this.state = {

    }
  }

  render() {
    if(this.props.include){
      return (
         <Wrapper>
            <Card>
              <ListsFilter {...this.props}/>
              <DealStatusFilter {...this.props}/>
              <TagFilter {...this.props}/>
              <AddedByFilter {...this.props}/>
              <DateAddedFilter {...this.props}/>

            </Card>

            <Card>

              <MailTemplateFilter {...this.props} />
              <CampaignFilter {...this.props}/>
              <TimesMailed {...this.props}/>
              <SendingQueueFilter {...this.props}/>

              <IncludeImage {...this.props}/>
              <DidSkipTrace {...this.props}/>

            </Card>

         </Wrapper>
      )
    }

    return <Wrapper />
  }

}

export default DealFilters;
