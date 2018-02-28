### How it works 

----
### Brace document navlink
* [Contributers code of conduct](https://github.com/restarian/brace_document_navlink/blob/master/docs/contributers_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_navlink/blob/master/docs/guidelines_for_contributing.md)
* Specification
  * [License information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/license_information.md)
* [Available options and usage](https://github.com/restarian/brace_document_navlink/blob/master/docs/available_options_and_usage.md)
* [Synopsis](https://github.com/restarian/brace_document_navlink/blob/master/docs/synopsis.md)
* **How documents are modified**

----


#### How is the navigation links inserted?

The first sub-heading of the markdown file found will be used for the link title which is the first ##[#,..]
found in the document. The page navigation list will be inserted (or replaced), at the first markdown 
underline ---[-,..] found followed by the heading: #[#,..] [specified document title]. If an existing 
navigation list is not found than it will be injected below the first sub-heading (any heading which has
more than one #), found in the file. E.g. The following navigation text is matched in the markdown file for 
document replacement:

  ----                         <-- this text is not replaced
  ### Document pages           <-- replaced with same title or with the value set to --title when the --force-title flag is set
  * [link](url)                <-- replaced with the configured url.
  * Some documuntation text    <-- this text is not replaced sense it is not a markdown link
  * [link](url)                <-- this and all subsequent text is not altered sense the above text was not a markdown link

In the example above, only the third line (the markdown link syntax), is altered in the document. If the 
file does not contain an underline and the #[#,..] [specified document title] string than one will be created
underneath the sub-heading found above using the default title (which can be set with --title), of "Document pages

