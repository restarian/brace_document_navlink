# Brace Document Navlink
### Package Specifications

----

### Brace Document Navlink help pages
* [Available options and usage](https://github.com/restarian/brace_document_navlink/blob/master/docs/available_options_and_usage.md)
* [Contributer code of conduct](https://github.com/restarian/brace_document_navlink/blob/master/docs/contributer_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_navlink/blob/master/docs/guidelines_for_contributing.md)
* [How documents are modified](https://github.com/restarian/brace_document_navlink/blob/master/docs/how_documents_are_modified.md)
* [Synopsis](https://github.com/restarian/brace_document_navlink/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/license_information.md)
  * **Package information**
  * [Unit test output](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/unit_test_output.md)
----

**Version**: 1.1.5

**Description**: A Brace Document plugin which injects a navigation list into markdown documents

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)

**Dependencies**: [amdefine](https://npmjs.org/package/amdefine) [bracket_print](https://npmjs.org/package/bracket_print) [bracket_utils](https://npmjs.org/package/bracket_utils)

**Development dependencies**: [brace_maybe](https://npmjs.org/package/brace_maybe) [mocha](https://npmjs.org/package/mocha) [chai](https://npmjs.org/package/chai) [requirejs](https://npmjs.org/package/requirejs)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | make_docs | ```brace_document --link --link-dest README.md --link-path docs/synopsis.md --navlink -i docs_raw -b docs -r --force-title --title "Brace Document Navlink help pages" --sort depth``` |
 | make_docs_extra | ```npm run make_docs --silent -- --specification --mocha``` |

**Keywords**: *markdown*, *navigation*, *documentation*, *navbar*, *navlist*, *generation*

**Technologies used in development**:
  * [VIM](https://www.vim.org) As the primary IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) As the development operating environment
  * [Ubuntu on Windows](https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6) For unit testing
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage
  * [Blender](https://blender.org) For logo design and art rendering