## Command line and module option data

---
### Document pages

#### The full list of available options. 
These options are available via the command line or passed into the platform/plugin constructors when using as module import. 

* -u, --url <string>
	* This is the url of the repository server. The default is to either use the git remote origin url of the current project.
* -t, --title <string>
	* The title of the document heading to use when one is not found. This is also used when the force title flag is set.
* -f, --force-title                 
	* The title found in the current page markdown will be used if this is not set. All of the document titles will be replaced with the value of the title option if it is set.
* --indentation <string>
	* The indentation is prepended to the navigation list entry for every level deep it is contained in the directory structure. The default is two spaces which is how most markdown parsed like it.
