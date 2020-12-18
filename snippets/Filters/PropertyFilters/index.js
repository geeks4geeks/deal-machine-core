import React, { Component } from 'react';

import { Wrapper, Card } from 'app/NativeComponents/common';

import OwnerStatusFilter from './OwnerStatusFilter';
import VacancyFilter from './VacancyFilter';
import PreforeclosureFilter from './PreforeclosureFilter';
import TaxDelinquencyFilter from './TaxDelinquencyFilter';

import SalePriceFilter from './SalePriceFilter';
import SaleDateFilter from './SaleDateFilter';
import TotalValueFilter from './TotalValueFilter';
import MortgageAmountFilter from './MortgageAmountFilter';
import EquityPercentFilter from './EquityPercentFilter';

import YearBuiltFilter from './YearBuiltFilter';
import BuildingSizeFilter from './BuildingSizeFilter';
import LotAcreageFilter from './LotAcreageFilter';
import TotalBedroomsFilter from './TotalBedroomsFilter';
import TotalBathroomsFilter from './TotalBathroomsFilter';
import UnitsCountFilter from './UnitsCountFilter';

import PropertyCityFilter from './PropertyCityFilter';
import PropertyStateFilter from './PropertyStateFilter';
import PropertyZipFilter from './PropertyZipFilter';

import OwnerNameFilter from './OwnerNameFilter';
import OwnerCityFilter from './OwnerCityFilter';
import OwnerStateFilter from './OwnerStateFilter';
import OwnerZipFilter from './OwnerZipFilter';

class PropertyFilers extends Component {

  constructor(props){
    super(props);

    this.state = {

    }
  }

  renderPropertyAddressFilters(){
    if(this.props.include_property_input_filters){
      return(
        <Wrapper>
          <Card>
            <PropertyCityFilter {...this.props}/>
            <PropertyStateFilter {...this.props}/>
            <PropertyZipFilter {...this.props} />
          </Card>

          <Card>
            <OwnerNameFilter {...this.props}/>
            <OwnerCityFilter {...this.props}/>
            <OwnerStateFilter {...this.props}/>
            <OwnerZipFilter {...this.props} />
          </Card>
        </Wrapper>
      )
    }
  }

  render() {
    if(this.props.include){
      return (
         <Wrapper>

            <Card>

              <OwnerStatusFilter {...this.props}/>
              <VacancyFilter {...this.props}/>
              <PreforeclosureFilter {...this.props}/>
              <TaxDelinquencyFilter {...this.props}/>

              <SalePriceFilter {...this.props}/>
              <SaleDateFilter {...this.props} />
              <TotalValueFilter {...this.props}/>

              <MortgageAmountFilter {...this.props} />
              <EquityPercentFilter {...this.props}/>
            </Card>

            <Card>
              <YearBuiltFilter {...this.props}/>
              <BuildingSizeFilter {...this.props}/>
              <LotAcreageFilter {...this.props}/>
              <UnitsCountFilter {...this.props}/>
              <TotalBedroomsFilter {...this.props}/>
              <TotalBathroomsFilter {...this.props}/>

            </Card>

            {this.renderPropertyAddressFilters()}


         </Wrapper>
      )
    }

    return <Wrapper />;
  }

}

export default PropertyFilers;
