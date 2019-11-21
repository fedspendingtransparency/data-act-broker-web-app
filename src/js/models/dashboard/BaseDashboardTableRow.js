/**
 * BaseDashboardTableRow.js
 * Created by Alisa Burdeyny 11/20/19
 */

import { fileLabels } from 'dataMapping/dashboard/fileLabels';

/* eslint-disable object-shorthand */
const BaseDashboardTableRow = {
    populate: function (data) {
        const fileTypes = data.files.map((dataFile) => dataFile.type);
        fileTypes.sort();
        this.fileTypes = fileTypes;
        this.fileLabel = fileLabels[fileTypes.join('/')];
        this.period = `FY ${data.fy - 2000} / Q${data.quarter}`;
        this.ruleLabel = data.rule_label;
        this.instanceCount = data.instance_count;
        this.ruleDescription = data.rule_description;
        this.submissionId = data.submission_id;
    }
};
/* eslint-enable object-shorthand */

export default BaseDashboardTableRow;
