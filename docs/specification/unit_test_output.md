

---
### Document pages
* [Available options and usage](https://github.com/restarian/brace_document_navlink/blob/master/docs/available_options_and_usage.md)
* [Contributers code of conduct](https://github.com/restarian/brace_document_navlink/blob/master/docs/contributers_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_navlink/blob/master/docs/guidelines_for_contributing.md)
* [How documents are modified](https://github.com/restarian/brace_document_navlink/blob/master/docs/how_documents_are_modified.md)
* [Synopsis](https://github.com/restarian/brace_document_navlink/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/license_information.md)
  * [Package specification](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/package_specification.md)
  * **Unit test output**

---
## Output of the unit testing


  * using stop further progression methodology for dependencies in: acquireNavlink.js

    * checking for dependencies..

      * ✓ r_js in the system as a program

    * the acquireNavlink API member generates the correct navigation link data when

      * ✓ all arguments are passed in as empty data objects

      * ✓ with all arguments are passed in empty except the structure parameter

      * ✓ with a structure and link url and an empty current_page

      * ✓ with a structure and link url and a current_path for one of the other stucture entities

      * ✓ -- synchronously -- with a structure and link url and a current_path for a structure entry


  * using stop further progression methodology for dependencies in: findUrl.js

    * checking for dependencies..

      * ✓ r_js in the system as a program

      * ✓ git is available in the system as a program

      * ✓ is able to find the dummy submodule at /home/nickali/Restarian/brace_document_navlink/test/example

      * ✓ is able to set a new remote origin to the dummy repository /home/nickali/Restarian/brace_document_navlink/test/example

    * using the blank testing example directory -> test/example

      * ✓ finds the correct url data for the project


  * using stop further progression methodology for dependencies in: modifyData.js

    * checking for dependencies..

      * ✓ r_js in the system as a program

    * the modifyData API member replaces the passed in data

      * ✓ all arguments are passed in as empty data objects

      * ✓ with all arguments are passed in as empty data objects except the structure parameter

      * ✓ with a structure and a incomplete data object and an empty link url

      * ✓ with a structure and a incomplete data object which has an empty content value and an empty link url

      * ✓ with a structure and a incomplete data object which has an empty content value and an empty link url with the forceTitle option

      * ✓ with a structure and a incomplete data object that has only one line of page text and an link url and the title set to GooD deal

      * ✓ with a nested structure and a incomplete data object that has only one line of page text and an link url and the title set to GooD deal


  * using stop further progression methodology for dependencies in: otherAPI.js

    * the other API members such as

      * ✓ the sentenceConvert member works as expected



  * 20 passing


