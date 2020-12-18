import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper
} from 'app/NativeComponents/common';

import {
  toggleActionSheet
} from 'app/NativeActions';

import DashboardMore from './/DashboardMore';
import HouseMore from './HouseMore';
import RouteMore from './RouteMore';
import ListMore from './ListMore';
import ActiveDealOptions from './ActiveDealOptions';

import ConfirmUndo from './ConfirmUndo';
import ConfirmPurchase from './ConfirmPurchase';

import DeleteAddress from './DeleteAddress';
import DeleteEmail from './DeleteEmail';
import AnotherDeal from './AnotherDeal';
import DeletePhone from './DeletePhone';
import SendingMode from './SendingMode';
import DeleteNote from './DeleteNote';

import OnboardingBillingMoreOptions from './OnboardingBillingMoreOptions';
import CanceledMoreOptions from './CanceledMoreOptions';
import BadCardMoreOptions from './BadCardMoreOptions';
import RequestedTeamMoreOptions from './RequestedTeamMoreOptions';
import TeamRemovedMoreOptions from './TeamRemovedMoreOptions';

import Logout from './Logout';
import CancelPlan from './CancelPlan';
import ShareMoreOptions from './ShareMoreOptions';

import RemoveTeamMember from './RemoveTeamMember';
import RemoveTeamLink from './RemoveTeamLink';
import DeleteTemplate from './DeleteTemplate';
import DeleteSignature from './DeleteSignature';
import DeleteCampaign from './DeleteCampaign';

import HousePic from './HousePic';
import ProfilePic from './ProfilePic';
import SignaturePic from './SignaturePic';

import PurchaseCredits from './PurchaseCredits';

import MapMode from './MapMode';
import LeadsPerPage from './LeadsPerPage';
import DefaultMailingOptions from './DefaultMailingOptions';
import UserMore from './UserMore';
import BillingMore from './BillingMore';
import MapMore from './MapMore';

class ActionSheets extends PureComponent {

  render() {
    if(this.props.actionSheet){
      return (
        <Wrapper>
          <DashboardMore />
          <HouseMore />
          <RouteMore />
          <ListMore />
          <UserMore />
          <BillingMore />
          <MapMore />
          <ActiveDealOptions />
          <ConfirmUndo />
          <ConfirmPurchase />
          <DeleteAddress />
          <DeleteEmail />
          <DeletePhone />
          <DeleteNote />

          <OnboardingBillingMoreOptions />
          <CanceledMoreOptions />
          <BadCardMoreOptions />
          <RequestedTeamMoreOptions />
          <TeamRemovedMoreOptions />

          <AnotherDeal />
          <SendingMode />

          <RemoveTeamMember />
          <RemoveTeamLink />
          <DeleteTemplate />
          <DeleteSignature />
          <DeleteCampaign />
          <PurchaseCredits />
          <HousePic />
          <ProfilePic />
          <SignaturePic />

          <Logout />
          <CancelPlan />

          <ShareMoreOptions />

          <MapMode />
          <LeadsPerPage />

          <DefaultMailingOptions />
        </Wrapper>
      );
    }

    return <Wrapper />

  }
}

const mapStateToProps = ({ native }) => {
  const { actionSheet } = native;
  return {
    actionSheet
  }
}


export default connect(mapStateToProps, {
  toggleActionSheet
})(ActionSheets);
