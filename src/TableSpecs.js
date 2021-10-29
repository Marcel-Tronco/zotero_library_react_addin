const TableObject = {
  toolbar: {
    standardCategories: ["Beispiel 1", "Beispiel 2", "Beispiel 3"],
    preselected: undefined,
    style: undefined
  },
  header: {
    initialOrder: {
      id: "title",
      direction: "asc"
    },
    style: undefined,
    cols: [
      {
        id: "title", // must match the Zotero Field name
        label: "Titel",
        type: "string"
      },
      {
        id: "creator",
        label: "Author:innen",
        type: "string" // todo: set this to string array and adapt "sorting" and display in table and details
      },
      {
        id: "date",
        label: "Erscheinungsjahr",
        type: "date"
      },
      {
        id: "itemType",
        label: "Medientyp",
        type: "string"
      }
    ]
  },
  body: {
    style: undefined
  }

}

export default TableObject