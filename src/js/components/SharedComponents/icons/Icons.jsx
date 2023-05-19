/**
  * Icons.jsx
  * Created by Kevin Li 4/25/2016
  */

import BaseIcon from './BaseIcon';

export class LoadingSpinner extends BaseIcon {}
LoadingSpinner.defaultProps = {
    iconName: 'usa-da-icon-loading-spinner',
    iconClass: 'usa-da-icon-loading-spinner',
    alt: 'Loading Icon'
};

export class CheckCircle extends BaseIcon {}
CheckCircle.defaultProps = {
    iconName: 'usa-da-icon-check-circle',
    iconClass: 'usa-da-icon-check-circle',
    alt: 'Checkmark or Successful Icon'
};

export class ExclamationCircle extends BaseIcon {}
ExclamationCircle.defaultProps = {
    iconName: 'usa-da-icon-exclamation-circle',
    iconClass: 'usa-da-icon-exclamation-circle',
    alt: 'Exclamation Mark Icon'
};
