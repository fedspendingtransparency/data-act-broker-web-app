**High level description:**

High level description of what the PR addresses should be put here. Should be detailed enough to communicate to the client what this PR addresses without diving into the technical nuances.

**Technical details:**

The technical details can be placed here for the knowledge of other developers. Any detailed caveats or specific deployment steps should be outlined here.

**Link to JIRA Ticket:**

[DEV-1234](https://federal-spending-transparency.atlassian.net/browse/DEV-1234)

**Mockup**
https://invis.io/RYA3XN5WP#/273832670_Homepage_2-2_E

The following are ALL required for the PR to be merged:
- [ ] Frontend review completed
- [ ] All componentWillReceiveProps, componentWillMount, and componentWillUpdate in relevant child/parent components/containers replaced with [future compatible life-cycle methods](https://reactjs.org/blog/2018/03/27/)update-on-async-rendering.html) per [JIRA item 3339](https://federal-spending-transparency.atlassian.net/browse/DEV-3339)
- [ ] Design review (if applicable)
- [ ] Merged concurrently with [Backend#1234](https://github.com/fedspendingtransparency/data-act-broker-backend/pull/1234)
- [ ] Unit tests added (if applicable)
- [ ] Passes linter
- [ ] Verified cross-browser compatibility
