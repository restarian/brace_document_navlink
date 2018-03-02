## Synopsis 

[![Build status](https://ci.appveyor.com/api/projects/status/vhqd52w3em2om16p/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/brace-document-navlink/branch/master) [![Build Status](https://travis-ci.org/restarian/brace_document_navlink.svg?branch=master)](https://travis-ci.org/restarian/brace_document_navlink) [![Downloads](https://img.shields.io/npm/dm/brace_document_navlink.svg?svg=true)](https://npmjs.org/package/brace_document_navlink)

| A part of the [Brace suite](https://github.com/restarian/restarian/blob/master/brace/README.md)| Developed with Windows 10 and Ubuntu 16 
| ---- | ----
| ![Brace](https://raw.githubusercontent.com/restarian/restarian/master/brace/doc/image/brace_logo_small.png) | [![Ubuntu on Windows](https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png)](https://github.com/Microsoft/BashOnWindows) | 

---
### Brace document navlink pages
* [Available options and usage](https://github.com/restarian/brace_document_navlink/blob/master/docs/available_options_and_usage.md)
* [Contributer code of conduct](https://github.com/restarian/brace_document_navlink/blob/master/docs/contributer_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_navlink/blob/master/docs/guidelines_for_contributing.md)
* [How documents are modified](https://github.com/restarian/brace_document_navlink/blob/master/docs/how_documents_are_modified.md)
* **Synopsis**
* Specification
  * [License information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/unit_test_output.md)

**Bonuses:**
* A fully asynchronous and idempotent API
* Uses AMD (*asynchronous module definition*), syntax
* Well commented, thoroughly unit tested and professional engineered scripting 
* Tested for Linux and/or Windows environments

**Caveats:**
* Requires nodejs version 6 or greater

This program provides plugin functionality which injects navigation list syntax into markdown pages using a two line denotation formula. Documents are then collected from a directory within project and a set of navigation link urls are injected which reference the relative location of the documents.

##### The document pages you are reading were processed with Brace document navlink too.
A scripts entry in the *package.json* file runs the appropriate command to process these docs.

#### Below is an example of a markdown page before and after processing with the Brace document navlink. 

Before using the Brace document navlink plugin a markdown page would look like this:
```markdown
## The main page

Some text about the project here
```

After processing with the Brace document navlink plugin the navigation links would be added like below:
```markdown

## The main page

---
### Document pages
---

Some text about the project here
```

