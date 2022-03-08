#### March 1, 2022{section=changelog}
In this release of the Broker, we:

* Updated FABS45 validation rule text to clarify what the rule is checking. No change was made to how the rule functions.
* Updated how Disaster Emergency Fund Code (DEFC) QQQ is handled. The Broker will process DEFC Q and DEFC QQQ as identical so no warnings should be triggered when 
these two are compared or when the user converts from Q to QQQ.
* Updated the default reporting period when creating DABS submissions to be the current period being reported on, or the next period to be reported if it is between reporting windows.
* Fixed minor bugs.