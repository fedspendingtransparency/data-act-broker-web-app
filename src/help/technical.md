#### December 2, 2019{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

Error/Warning Reports have been updated with the following to improve readability:

* Flex fields have been extracted from the "Field Names" and "Values Provided" columns and put into its own column labeled "Flex Fields".
* Added "Unique ID" column containing values unique to that rule to help identify specific rows.
* Added "Expected Value" column detailing the value expected for that error or warning.
* Added "Difference" column representing the difference(s) between the values provided and the values expected. Note: this will only be populated if both values are numerical.
* For cross-file reports:
  * Values are split between "Source Values" (provided) and "Target Values" (expected)
  * "Difference" column will be the difference(s) between the source and target values.
  * "Row Number" has been renamed to "Source Row Number".
  * "Source Flex Field" has been added representing the source flex fields.
  * Renamed columns to be singular and not plural for consistency.
* Any values with the string "None" have been replaced with a blank space.
* TAS values have been reformatted to match the format from USASpending.gov.
