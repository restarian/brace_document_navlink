# Brace Document Navlink 
## Synopsis 

[![Build status](https://ci.appveyor.com/api/projects/status/vhqd52w3em2om16p/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/brace-document-navlink/branch/master) [![Build Status](https://travis-ci.org/restarian/brace_document_navlink.svg?branch=master)](https://travis-ci.org/restarian/brace_document_navlink) [![Downloads](https://img.shields.io/npm/dm/brace_document_navlink.svg?svg=true)](https://npmjs.org/package/brace_document_navlink)

| A part of the [Brace suite](https://github.com/restarian/restarian/blob/master/brace/README.md)| Developed with Windows 10 and Ubuntu 16 
| ---- | ----
| ![Brace](https://raw.githubusercontent.com/restarian/restarian/master/brace/doc/image/brace_logo_small.png) | [![Ubuntu on Windows](https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png)](https://github.com/Microsoft/BashOnWindows) | 

----
### Document pages
* **Synopsis**
* [Making a difference with brace document navlink ](https://github.com/restarian/brace_document_navlink/blob/master/docs/contributing.md)
* [Contributor code of conduct](https://github.com/restarian/brace_document_navlink/blob/master/docs/code_of_conduct.md)
* [How it works](https://github.com/restarian/brace_document_navlink/blob/master/docs/mutation.md)
* [Command line program options](https://github.com/restarian/brace_document_navlink/blob/master/docs/usage.md)
* Specification
  * [License information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/license.md)
  * [Project specification data](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/specification.md)

----

**Author: Robert Steckroth, _Bust0ut_ [<RobertSteckroth@gmail.com>](mailto:robertsteckroth@gmail.com)**

**License: MIT**

**Bonuses:**
* Runs in Linux and/or Windows environments.
* Well commented, unit tested and professional code

**Caveats:**
* Requires nodejs version 5 or greater

This program provides plugin functionality that injects navigation list syntax into markdown pages. The pages are collected from a directory in the git project and link urls are created which reference them.

### The Brace Document Navlink document pages were processed with Brace document navlink too.
This is the command used to create the document pages you are reading now: ```bash > node path/to/brace_document/bin/document.js -d ./ -vre -t "Brace Document Navlink" -b docs docs_raw```

### Below is a simple example of a markdown page before and after processing with Brace document navlink. 
---- 

#### Before using the document navlink program a markdown page would look like this:
```javascript

# My module
## The main page

Some text about the project here
```

#### After processing with Brace document navlink the navigation links would be added like below:
```javascript

# My module
## The main page

----
### Document pages* [Command usage](https://github.com/yourcompany/my_module/blob/master/docs/usage.md)  * [The todo sheet ](https://github.com/yourcompany/my_module/blob/master/docs/development/todo.md)  * [License information](https://github.com/yourcompany/my_module/blob/master/docs/specification/license.md)----

Some text about the project here
```

