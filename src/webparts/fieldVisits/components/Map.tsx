import * as React from 'react';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import styles from './FieldVisits.module.scss';

import { IMapService } from '../services/MapService/IMapService';
import { IMapLocation } from '../model/IMapLocation';

export interface IMapProps {
    service: IMapService;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface IMapState {
    location: IMapLocation;
    locationSignature: string;
}

export class Map extends React.Component<IMapProps, IMapState> {

    constructor() {
        super();
        this.state = {
            location: null,
            locationSignature: null
        };
    }

    public render(): React.ReactElement<IMapProps> {

        if (this.props.country &&
            this.props.country.toLowerCase() == "usa" &&
            this.props.postalCode) {

            const locationSignature = this.getLocationSignature(
                this.props.address, this.props.city, this.props.state,
                this.props.country, this.props.postalCode);
            const mapApiKey = this.props.service.getMapApiKey();

            if (this.state.locationSignature === locationSignature) {

                // If here, the location state is valid, show it!
                const coordinates =
                    this.state.location.resourceSets[0]
                        .resources[0].point.coordinates;
                const latitude = coordinates[0];
                const longitude = coordinates[1];

                return (
                <div className={styles.weather}>
                  <div className={styles.weatherContainer}>
                    <div className={styles.weatherrow}>
                        <img src={`https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latitude},${longitude}/16?mapSize=600,300&pp=${latitude},${longitude}&key=${mapApiKey}`} />
                        <br />{`Map at ${latitude}, ${longitude}`}
                    </div>
                  </div>
                </div>);
            } else {
                // If here we have no location, or an old one. Get a new one.
                this.props.service.getLocation(
                    this.props.address,
                    this.props.city,
                    this.props.state,
                    this.props.postalCode
                )
                .then((location: IMapLocation) => {
                    this.setState({
                        location: location,
                        locationSignature: locationSignature
                    });
                });

                return (<div>Loading</div>);
            }
        } else {
            return (
                <div>No visit selected</div>
            );
        }
    }

    private getLocationSignature(address:string, city:string, state: string,
        country: string, postalCode: string) {
            return `${address}**${city}**${state}**${country}**${postalCode}`;
        }
}