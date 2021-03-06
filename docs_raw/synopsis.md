# Brace Document Navlink
## Synopsis

[![Build status](https://ci.appveyor.com/api/projects/status/vhqd52w3em2om16p/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/brace-document-navlink/branch/master)[![Downloads](https://img.shields.io/npm/dm/brace_document_navlink.svg?svg=true)](https://npmjs.org/package/brace_document_navlink)

| **The [Brace Suite]** | **[Ubuntu on Windows]**   |
|:---------------------:|:-------------------------:|
| ![Brace logo]         | ![Ubuntu on Windows logo] |         |

[Brace Suite]: https://github.com/restarian/restarian/tree/master/brace/
[Ubuntu on Windows]: https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6?activetab=pivot%3aoverviewtab

[Ubuntu on Windows logo]: https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png
[Brace logo]: https://raw.githubusercontent.com/restarian/restarian/master/brace/doc/image/brace_logo_small.png

---
### Document pages

---

**Bonuses:**
* A fully asynchronous and idempotent API
* Uses AMD (*asynchronous module definition*), syntax
* Well commented, thoroughly unit tested and professional engineered scripting
* Tested with Linux and Windows environments

### What this plugin does
This program provides plugin functionality for [Brace Document](https://npmjs.org/packages/brace_document) which injects navigation links into markdown pages using a two line denotation formula. Documents are collected from a directory within the project and a set of navigation link urls are injected which reference the relative location of the documents. The link urls are fully qualified to allow access from locations other than *github.com*.

### The document pages you are reading were processed with Brace document navlink too.
A scripts entry in the *package.json* file runs the appropriate command to process these docs. Simply use *npm run make_docs -- -v* to re-generate these documents after a alteration was made to the *docs_raw* directory.

### Below is an example of a markdown page before and after processing with the Brace document navlink plugin.
Before using the Brace document navlink plugin a markdown page would look like this:
```markdown
## The main page

Some text about the project here
```

  After processing a projects docuemnts with the Brace Document Navlink plugin the navigation links would be added to the pages like below:
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
    * Contributors
      * [Someone](https://github.com/yourcompany/my_module/blob/master/docs/specification/contributors/someone.md)
      * [Another person](https://github.com/yourcompany/my_module/blob/master/docs/specification/contributors/another_person.md)

---

Some text about the project here
```
