/**
* PublishedSubmissionWarningBanner.jsx
* Created by Alisa Burdeyny 3/10/17
*/

import React from 'react';
import BannerRow from './BannerRow';

const warningMessage = 'This submission has already been certified.' +
                       'Any changes made will not be reflected on usaspending until it is re-certified.';

const PublishedSubmissionWarningBanner = () => (
    <BannerRow type="warning" message={warningMessage} />
);

export default PublishedSubmissionWarningBanner;
