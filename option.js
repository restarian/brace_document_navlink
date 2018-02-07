module.exports = [

	{ "usage": 
`The first sub-heading of the markdown file found will be used for the link title which is the first ##[#,..] found in 
the document. The page navagation list will be inserted (or replaced), at the first markdown underline ---[-,..] found 
followed by the heading: #[#,..] [specified navlink title]. If an existing navigation list is not found than it will 
be injected below the first sub-heading (any heading which hase more than one #), found in the file. E.g. The following 
navigation text is matched in the markdown file for navlink replacement:

  ----                         <-- this text is not replaced
  ### Document pages           <-- replaced with same title or with the value set to --title when the --force-title flag is set
  * [link](url)                <-- replaced with the configured url.
  * Some documuntation text    <-- this text is not replaced sense it is not a markdown link
  * [link](url)                <-- this and all subsequent text is not altered sense the above text was not a markdown link

In the example above, only the third line (the markdown link syntax), is altered in the document. If the file does not 
contain an underline and the #[#,..] [specified navlink title] string than one will be created underneath the sub-heading 
found above using the default title (which can be set with --title), of "Document pages".`
	},
	{
		"flag": "-t, --title <string>", 
		"help": "The title of the navlink heading to use when one is not found. This is also used when the force title flag is set." 
	},
	{
		"flag": "-f, --force-title", 
		"help": "The title found in the current page markdown will be used if this is not set. All of the navlink titles will be replaced with" +
					" the value of the title option if it is set." 
	}
]

