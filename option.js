module.exports = [

	{ "usage": 
`  The first heading (a heading is one or more '#' followed by text until a newline is reached), of the markdown 
document will be used as the page title. The navagation link title will be set using the second heading found in
the document after the first one. The document file name will be used for the navagation link title if two
markdown headings could not be found within the page.
  The page navagation list will be inserted (or replaced), at the first markdown underline: ---[-,..] found 
followed by a mardown heading: #[#,..] ["title"]. If an existing navigation list is not found than it will 
be injected below the second heading found in the document. If no headings are available then the navagation 
list will be injected at the very top of the page.
E.g. The following navigation list text is matched in the markdown document for replacement:

Some text about this doc       <-- this text is not replaced

  ----                         <-- this text is not replaced
  ### Document pages           <-- replaced with the same title (Document pages) or with the value set to "title" when the -f flag is set
  * [link](url)                <-- link will be the navagation title found as the second heading and url will be the "url" option value
  * Some documuntation text    <-- this text is not replaced sense it is not a markdown link
  * [link](url)                <-- this and all subsequent text is not altered sense the above text was not a markdown link

In the example above, only the fifth line (the markdown link syntax under the heading), is altered in the document.`
	},
	{
		"flag": "-t, --title <string>", 
		"help": "The title of the navlink heading to use when one is not found. This is also used when the force title flag is set.",
		"default": "Document pages", 
	},
	{
		"flag": "-f, --force-title", 
		"help": "The title found in the current page markdown will be used if this is not set. All of the navlink titles will be replaced with" +
					" the value of the title option if it is set." 
	},
	{
		"flag": "-u, --url <string>", 
		"help": "This is the url of the repository host. The default is to use the git remote origin url of the project root if this is not set."
	},
	{
		"flag": "--indentation <string>", 
		"help": "This is prepended to every navagation list entry which is a subdirectory. It will be added together for every level down the entry is.",
		"default": "  "
	},
]

