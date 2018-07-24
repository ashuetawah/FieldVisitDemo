import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IVisit } from '../model/IVisit';

export interface ICompanyInfoProps {
  visit: IVisit;
}

export class CompanyInfo extends React.Component<ICompanyInfoProps, {}> {

  public render(): React.ReactElement<ICompanyInfoProps> {

    if (this.props.visit) {
        return (
            <div>
                <div>{ this.props.visit.customer.CompanyName }</div>
                <div>{ this.props.visit.customer.Address }</div>
                <div>{ this.props.visit.customer.City }, 
                     { this.props.visit.customer.Region }
                     { this.props.visit.customer.PostalCode }</div>
                <div>{ this.props.visit.customer.Phone }</div>
                <div>{ this.props.visit.customer.ContactName }, 
                     { this.props.visit.customer.ContactTitle }</div>
            </div>
        );
    } else {
        return (
            <div>No visit selected</div>
        );
    }

  }
}