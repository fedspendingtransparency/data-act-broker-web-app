#### June 14, 2019{section=changelog}
In this release of the Broker, we:

* Backend updates to implement DAIMS 1.3.1 changes related to File F, and pave the way for unified, Broker-based approach to subaward data in USAspending
* Improved how the Broker uses and stores Executive Compensation data so that File E can be generated from an internal table (updated daily) rather than an ad-hoc SAM WSDL query. Executive Compensation data is now stored transactionally with contracts and assistance data for easier and more accurate surfacing on USAspending. Backfilled this executive compensation data at the transactional level (at the time of award) where historical EC data was available in SAM SFTP service. 
