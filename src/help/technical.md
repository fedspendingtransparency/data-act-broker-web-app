#### February 24, 2026{section=technical}

In this release, here is a list of technical changes that may require infrastructure or database updates, or represents additional functionality.

* Added support for a new SF133 file format including several new columns and split rows. Note that no rules will be affected by this new format update.
* Updated existing SF133 loader to exclude processing zero-dollar rows to save on database space. Again noting that no rules will be affected by this change.
