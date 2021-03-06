# Brace Document Navlink
## Command line and module option data

---
### Document pages

---

### The full list of available options which this plugin adds to the platform..
#### These options are available via the command line or passed into the platform/plugin constructors when using as module import.
* -u, --url <*string*> default: the git remote origin url of the current project
	* This is the url of the repository server to use when creating the navlink.
* -t, --title <*string*> default: Document pages"
	* The title of the document heading to use when one is not found. This is also used when the *force-title* option is set.
* -f, --force-title                 
	* The title found in the current page markdown will be used if this is not set. All of the navlink titles will be replaced with the value of the *title* option if it is set.
* --indentation <*string*>
	* The indentation is prepended to the navigation list entry for every level deep it is contained within the directory structure. The default is two spaces which is how most markdown parsers like it.
* --line-breaking <*"auto"*, *"win32"*, *"posix"*> default: "auto"
	* All of the line breaks within the outputted document will be substituted with the correlating identifiers via this option. Currently supported types will use the following identifiers: *win32* -> \r\n, *posix* -> \n
