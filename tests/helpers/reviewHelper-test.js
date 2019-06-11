import * as reviewHelper from "helpers/reviewHelper";

describe("reviewHelper", () => {
    describe("getFileStates", () => {
        const generateParam = (jobs = []) => ({
            jobs
        });
        const defaultResult = (name) => ({
            report: null,
            error_count: 0,
            warning_count: 0,
            error_data: [],
            warning_data: [],
            file_type: name
        });
        it("returns an empty object if file_type is falsy", () => {
            expect(reviewHelper.getFileStates(generateParam())).toEqual({});
        });
        it("returns an object keyed by file type", () => {
            expect(
                reviewHelper.getFileStates(
                    generateParam([
                        { file_type: "test", error_data: [], warning_data: [] },
                        { file_type: "test2", error_data: [], warning_data: [] }
                    ])
                )
            ).toEqual({
                test: defaultResult("test"),
                test2: defaultResult("test2")
            });
        });
        it("returns an object keyed by file type with error_count value based on error_data.occurrences", () => {
            const itemWithErrorData = Object.assign(defaultResult("test"), {
                error_data: [{ occurrences: "10" }]
            });
            const itemWithWarningData = Object.assign(defaultResult("test2"), {
                warning_data: [{ occurrences: "10" }]
            });
            expect(reviewHelper.getFileStates(generateParam([itemWithErrorData]))).toEqual({
                test: Object.assign(itemWithErrorData, { error_count: 10 })
            });
            expect(reviewHelper.getFileStates(generateParam([itemWithWarningData]))).toEqual({
                test2: Object.assign(itemWithWarningData, { warning_count: 10 })
            });
        });
    });

    describe("getCrossFileData", () => {
        // two params, data and type
        const data = {
            error_data: [
                { target_file: "appropriations", source_file: "program_activity" },
                { target_file: "not_valid", source_file: "not_valid" }
            ],
            warning_data: [
                { target_file: "appropriations", source_file: "program_activity" },
                { target_file: "not_valid", source_file: "not_valid" }
            ]
        };

        const types = ["warnings", "errors"];

        // iterates over each item in the type property, whose value is an array,
        // builds output object of shape:
        it("returns only valid source/target file paris", () => {
            const errors = reviewHelper.getCrossFileData(data, types[1]);
            const warnings = reviewHelper.getCrossFileData(data, types[0]);

            expect(Object.keys(errors).length).toEqual(1);
            expect(errors["appropriations-program_activity"]).toEqual([data.error_data[0]]);
            expect(Object.keys(warnings).length).toEqual(1);
            expect(warnings["appropriations-program_activity"]).toEqual([data.warning_data[0]]);
        });
    });
});
