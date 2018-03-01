## How the plugin operates 

---
### Brace document navlink pages
* [Available options and usage](https://github.com/restarian/brace_document_navlink/blob/master/docs/available_options_and_usage.md)
* [Contributer code of conduct](https://github.com/restarian/brace_document_navlink/blob/master/docs/contributer_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_navlink/blob/master/docs/guidelines_for_contributing.md)
* **How documents are modified**
* [Synopsis](https://github.com/restarian/brace_document_navlink/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/brace_document_navlink/blob/master/docs/specification/unit_test_output.md)

#### The navigation links are inserted into markdown pages using a regular expression match.
The navigation link test will be injected at the very top of the page if a match is not found. The program looks for a markdown underscore followed by a markdown heading.  

The regular expression uses by this plugin to locate a navigation list: ```/([\n,\r]+[\-,\*\_]{3,}[\n,\r]+#+[\ ,\t]+)([^\n,\r]+)[\n,\r]+/```
The regular expression uses by this plugin to locate a navigation list bullet: ```/(\s*[\*,\+,\-]\s+.*[\n,\r]+)/```


##### Below are some examples of what is matched as a navigation list when parsing the markdown files. 
*note the newline above underscores which markdown syntax requires*

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

***
# A BIG ONE	* This text is replaced
	This text remains
```

```markdown

___
# Another title 	* This text is not replaced because of the empty line above
```
