# Brace Document Navlink
### Output of unit testing
 
----
### Brace Document Navlink help pages
* [Available options and usage](https://github.com/restarian/brace_document_navlink/blob/master/docs/available_options_and_usage.md)
* [Contributor code of conduct](https://github.com/restarian/brace_document_navlink/blob/master/docs/contributor_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_navlink/blob/master/docs/guidelines_for_contributing.md)
* [How documents are modified](https://github.com/restarian/brace_document_navlink/blob/master/docs/how_documents_are_modified.md)
* [Synopsis](https://github.com/restarian/brace_document_navlink/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/package_information.md)
  * **Unit test output**
----
 
### ---------- Start of unit testing ----------

  * using stop further progression methodology for dependencies in: acquireNavlink.js
    * checking for dependencies..
      * √ r_js in the system as a program
    * the acquireNavlink API member generates the correct navigation link data when
      * √ all arguments are passed in as empty data objects
      * √ with all arguments are passed in empty except the structure parameter
      * √ with a structure and link url and an empty current_page
      * √ with a structure and link url and a current_path for one of the other stucture entities
      * √ -- synchronously -- with a structure and link url and a current_path for a structure entry

  * using stop further progression methodology for dependencies in: findUrl.js
    * checking for dependencies..
      * √ r_js in the system as a program
      * √ git is available in the system as a program
      * √ is able to find the dummy submodule at C:\Users\Rober\Worklog\node_modules\brace_document_navlink\test\example
      * √ is able to set a new remote origin to the dummy repository C:\Users\Rober\Worklog\node_modules\brace_document_navlink\test\example
    * using the blank testing example directory -> test\example
      * √ finds the correct url data for the project

  * using stop further progression methodology for dependencies in: modifyData.js
    * checking for dependencies..
      * √ r_js in the system as a program
    * the modifyData API member correctly alters the passed in data when
      * √ all arguments are passed in as empty data objects
      * √ with all arguments are passed in as empty data objects except the structure parameter
      * √ with a structure and a incomplete data object and an empty link url
      * √ with a structure and a incomplete data object which has an empty content value and an empty link url
      * √ with a structure and a incomplete data object which has an empty content value and an empty link url with the forceTitle option
      * √ with a structure and a incomplete data object that has only one line of page text and an link url and the title set to GooD deal
      * √ with a nested structure and incomplete data object that has only one line of page text and an link url and the title option used
      * √ with a nested structure and incomplete data object that has a barebones navlink identifier
      * with a nested structure and incomplete data object and using content
        * √ with content variant A
        * √ with content variant B
        * √ with content variant C
        * √ with content variant D
        * √ with content variant E
        * √ with content variant F
        * √ with content variant F and forcing win32 platform type for line breaks
        * √ with content variant F and forcing posix platform type for line breaks

  * using stop further progression methodology for dependencies in: otherAPI.js
    * checking for dependencies..
      * √ r_js in the system as a program
    * the other API members such as
      * √ the sentenceConvert member works as expected

  * 30 passing


### ---------- End of unit testing ----------