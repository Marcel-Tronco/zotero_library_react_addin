# Zotero-Library Display

## Description

This is a react add-in that displays data of online collections of bibliographical data via Zotero.org.

## Usage

### Config
The app is configurable via the src/models/TableSpecs.js file. There you can chose, how to lable columns, what fields to include in the details view, how to label which Zotero item and creator type in your table.

Additionally for **the build process a getEnv.js file has to be present**, which passes the (public) API key for the zotero library you want to present and the name of the collection you want to show. Like so:

```
const zoteroId = () => <your zotero id>
const overalCollection = () => <your collection name>

export default {
  zoteroId,
  overalCollection
}
```
### Build Process
Just start build skript like `npm run build`, after you configured and installed (`npm i`)

### Deployment

To use the add in script simply put a div with the id "react-root" and a script tag that loads the skript, from where you put it on your server like:
```
<div id="react-root"> </div>
<script src=<your path> ></script>
```