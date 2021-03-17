# dataLayer Builder + Enhanced Ecommerce
This custom template listens for xhr/fetch requests and push info to datalayer ajaxInfo and sends event ajaxSuccess.

# Author
Frode Storhaug (https://www.knowit.no/).

# Release Notes
| Date | Notes |
|-------|-------|
| 20 March 2021 | First version of the tag released. |

# Description
Important: This template will only work if the dataLayer used on the site hasn't been changed to a custom dataLayer name

-You can set excluded urls. If requeste url starts with one in excluded list it is ignored
-Debug mode will console.log some details
	-Excluded url list
-Sets the following to dataLayer

```json
'ajaxInfo': {
	'ajaxEventMethod': 'get or post',
	'ajaxEventUrl' : request url,
	'ajaxPostData' : body data,
	'ajaxEventLabel' : ''
}
```