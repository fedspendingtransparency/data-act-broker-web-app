/**
 * BaseDashboardTableRow.js
 * Created by Alisa Burdeyny 11/20/19
 */

const BaseDashboardTableRow = {
    populate: function (data) {
        data.files.sort();
        this.fileTypes = data.files;
        this.period = data.is_quarter === true ?
            `FY ${data.fy - 2000} / Q${data.period / 3}` : `FY ${data.fy - 2000} / P${data.period}`;
        this.ruleLabel = data.rule_label;
        this.instanceCount = data.instance_count;
        this.ruleDescription = data.rule_description;
        this.submissionId = data.submission_id;
        this.submittedBy = data.submitted_by;
    }
};

export default BaseDashboardTableRow;
