Following things must be updated:

* Release version in package.json
* Release version in module.json
* ReadMe version in module.json
* Compatibility versions in module.json, if applicable

Then:

* `git tag [version]`
* `git push --tags`
* Generate a new release in GH Releases
* Update release data on Foundry VTT site
