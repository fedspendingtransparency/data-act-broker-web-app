#### January 10, 2018

In this release of the Broker, we made the following updates:

 - [FABS 31.1 Rule Update](#/help?section=0110rule311)

 - [Update Database Fields](#/help?section=0110databaseUpdate)

 - [Update B9/B10 rules](#/help?section=0110ruleUpdate)

 - [Bug Fixes](#/help?section=0110bugs)


#### Update FABS rule 31.1 error message {section=0110rule311}
In this release of the broker we updated the language of FABS rule 31.1 to be more descriptive.

#### Update B9/B10 to check for 2016-2018 (changed from just 2016-2017) {section=0110ruleUpdate}
In this relase of the broker we have updated rules B9 and B10.

#### Bug Fixes {section=0110bugs}
In this release, the following bugs have been found and addressed
 - Users were unable to create a DABS submission if a FABS submission shared the same agency and action dates. 
 - Users were unable to start re-validation of certain submissions due to missing values in the API call. 
 - Users were unable to delete submissions that contain a cached D file.