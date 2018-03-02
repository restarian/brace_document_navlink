## Synopsis 

[![Build status](https://ci.appveyor.com/api/projects/status/vhqd52w3em2om16p/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/brace-document-navlink/branch/master) [![Build Status](https://travis-ci.org/restarian/brace_document_navlink.svg?branch=master)](https://travis-ci.org/restarian/brace_document_navlink) [![Downloads](https://img.shields.io/npm/dm/brace_document_navlink.svg?svg=true)](https://npmjs.org/package/brace_document_navlink)

| A part of the [Brace suite](https://github.com/restarian/restarian/blob/master/brace/README.md)| Developed with Windows 10 and Ubuntu 16 
| ---- | ----
| ![Brace](https://raw.githubusercontent.com/restarian/restarian/master/brace/doc/image/brace_logo_small.png) | [![Ubuntu on Windows](https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png)](https://github.com/Microsoft/BashOnWindows) | 

---
### Document pages

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
* **Synopsis**
* [Command usage](https://github.com/yourcompany/my_module/blob/master/docs/usage.md)
* Development
  * [The todo sheet ](https://github.com/yourcompany/my_module/blob/master/docs/development/todo.md)
* Specification
  * [License information](https://github.com/yourcompany/my_module/blob/master/docs/specification/license.md)
  * [Project Specs](https://github.com/yourcompany/my_module/blob/master/docs/specification/specification.md)

---

Some text about the project here
```

