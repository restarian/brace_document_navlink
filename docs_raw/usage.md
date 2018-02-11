# Brace Document Navlink
### Command line/program options 

----
### Brace document navlink

----


#### The full list of available options.
* -u, --url <string>
	* This is the url of the repository server. The default is to either use the git remote origin url of the current project.
* -t, --title <string>
	* The title of the document heading to use when one is not found. This is also used when the force title flag is set.
* -f, --force-title                 
	* The title found in the current page markdown will be used if this is not set. All of the document titles will be replaced with the value of the title option if it is set.
