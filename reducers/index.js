import { combineReducers } from 'redux';
import AuthReducer from 'app/DealMachineCore/reducers/AuthReducer';
import DrawerReducer from 'app/DealMachineCore/reducers/DrawerReducer';
import DealReducer from 'app/DealMachineCore/reducers/DealReducer';
import PhotoReducer from 'app/DealMachineCore/reducers/PhotoReducer';
import MapReducer from 'app/DealMachineCore/reducers/MapReducer';
import HouseReducer from 'app/DealMachineCore/reducers/HouseReducer';
import ModalReducer from 'app/DealMachineCore/reducers/ModalReducer';
import TemplateReducer from 'app/DealMachineCore/reducers/TemplateReducer';
import SignatureReducer from 'app/DealMachineCore/reducers/SignatureReducer';
import CampaignReducer from 'app/DealMachineCore/reducers/CampaignReducer';
import SettingsReducer from 'app/DealMachineCore/reducers/SettingsReducer';
import BillingReducer from 'app/DealMachineCore/reducers/BillingReducer';
import PromoReducer from 'app/DealMachineCore/reducers/PromoReducer';
import TeamReducer from 'app/DealMachineCore/reducers/TeamReducer';
import ActivityReducer from 'app/DealMachineCore/reducers/ActivityReducer';
import AnalyticsReducer from 'app/DealMachineCore/reducers/AnalyticsReducer';
import MarketingReducer from 'app/DealMachineCore/reducers/MarketingReducer';
import TagReducer from 'app/DealMachineCore/reducers/TagReducer';
import RouteReducer from 'app/DealMachineCore/reducers/RouteReducer';
import BadgeReducer from 'app/DealMachineCore/reducers/BadgeReducer';
import GridReducer from 'app/DealMachineCore/reducers/GridReducer';
import TeamLinkReducer from 'app/DealMachineCore/reducers/TeamLinkReducer';
import PropertiesReducer from 'app/DealMachineCore/reducers/PropertiesReducer';
import PropertyMapReducer from 'app/DealMachineCore/reducers/PropertyMapReducer';
import LeadReducer from 'app/DealMachineCore/reducers/LeadReducer';
import ListReducer from 'app/DealMachineCore/reducers/ListReducer';
import FilterReducer from 'app/DealMachineCore/reducers/FilterReducer';
import OwnerReducer from 'app/DealMachineCore/reducers/OwnerReducer';

/* native only */
import NativeReducers from 'app/NativeReducers';

export default combineReducers({
  settings: SettingsReducer,
  auth: AuthReducer,
  drawer: DrawerReducer,
  deal: DealReducer,
  photo: PhotoReducer,
  map: MapReducer,
  modal: ModalReducer,
  house: HouseReducer,
  template: TemplateReducer,
  signature: SignatureReducer,
  campaign: CampaignReducer,
  billing: BillingReducer,
  promo: PromoReducer,
  team: TeamReducer,
  activity: ActivityReducer,
  analytics: AnalyticsReducer,
  marketing: MarketingReducer,
  property_tags: TagReducer,
  route: RouteReducer,
  badges: BadgeReducer,
  grid: GridReducer,
  team_link: TeamLinkReducer,
  property: PropertiesReducer,
  property_map: PropertyMapReducer,
  lead: LeadReducer,
  list: ListReducer,
  filter: FilterReducer,
  owner: OwnerReducer,
  ...NativeReducers
});
