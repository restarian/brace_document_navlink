module.exports = [

	{ "usage": 
`  This plugin generates a navigation list which correlates to a documents directory structure. The navagation list will be 
inserted (or replaced), at the first markdown horizontal rule followed by a markdown heading: #[#,..] <"title"> found in the 
document. If an existing navigation list is not found than one will be generated and injected at the very top of the 
document. All markdown bullets directly below that denotes what will be replaced with the updated navigation list will be.  

E.g. the following navigation list text is matched in the markdown document for replacement:

Some text about this doc       <-- this is not replaced
                               <-- this empty line is required to denote the line below as a markdown horizontal rule 
  ---                          <-- this is not replaced
  ### Document pages           <-- this is only replaced with the value set to "title" when the --force-title flag is set
  * [link](url)                <-- this text is replaced sense it is a markdown bullet 
  * Some documuntation text    <-- this text is replaced sense it is a markdown bullet 
										 <-- this text is not replaced sense empty lines are not markdown bullets
  * [link](url)                <-- this and all subsequent text is not altered sense the above text was not a markdown bullet

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

