/**
 * BaseActiveDashboardTableRow.js
 * Created by Alisa Burdeyny 11/20/19
 */

import { fileLabels } from 'dataMapping/dashboard/fileLabels';

/* eslint-disable object-shorthand */
const BaseActiveDashboardTableRow = {
    populate: function (data, meta) {
        const fileTypes = meta.files.map((metaFile) => metaFile.type);
        fileTypes.sort();
        this.fileTypes = fileTypes;
        this.fileLabel = fileLabels[fileTypes.join('/')];
        this.ruleLabel = data.rule_label;
        this.instanceCount = data.instance_count;
        this.ruleDescription = data.rule_description;
        this.submissionId = meta.submission_id;
        this.category = data.category;
        this.impact = data.impact;
    }
};
/* eslint-enable object-shorthand */

export default BaseActiveDashboardTableRow;
