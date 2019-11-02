## How the plugin operates 

---
### 'Brace
* [Available options and usage](https://github.com/restarian/brace_document_navlink/blob/master/docs/available_options_and_usage.md)
* [Contributer code of conduct](https://github.com/restarian/brace_document_navlink/blob/master/docs/contributer_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_navlink/blob/master/docs/guidelines_for_contributing.md)
* **How documents are modified**
* [Synopsis](https://github.com/restarian/brace_document_navlink/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/license_information.md)


---

### The parser is fully tested using *win32* and *posix* style line breaks. 
The current platform is automatically detected and the corresponding line breaks are used within the new document. The line breaks contained within the original documents are therefore irrelevant as the currently specified one will be substituted.
**IMPORTANT**: all of the line breaks in the document will be replaced with the specified one.

### The navigation links are inserted into markdown pages using a regular expression match.
The navigation link test will be injected at the very top of the page if a match is not found. The program looks for a markdown horizontal rule followed by a markdown heading.  

The regular expression uses by this plugin to locate a navigation list: 

```((?:\r\n|\n)+[\ ,\t,\-,\*,\_]{3,}(?:\r\n|\n)+)(#+[\ ,\t]+)([^(?:\n||\r\n)]+)(?:\r\n|\n)```

The regular expression uses by this plugin to locate a navigation list bullets (*this is appended to the navigation list regex above*): 

```([\ ,\t]*[\*,\+,\-][\ ,\t]+.*(?:\r\n|\n)+)```

#### Below are some examples of what is matched as a navigation list when parsing the markdown files. 
*make sure to note the newline which above horizontal rule which the markdown syntax requires*
---

```markdown

--------
##### The title

```

```markdown

***
##### The title
This text remains
```

```markdown

_ _ _ _
# A BIG ONE
	This text remains
```

```markdown

---
# Another title 

+ This text is not replaced because of the empty line above
```
