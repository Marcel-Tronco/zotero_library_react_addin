export const  toolbar = {
    standardCategories: ["Beispiel 1", "Beispiel 2", "Beispiel 3"],
    preselected: undefined,
    style: undefined
  }
export const  header = {
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
  }
export const  body = {
    style: undefined,
    details: {
      "book": [
        {
          fieldName: "abstractNote",
          label: "Beschreibung",
        },
        {
          fieldName: "language",
          label: "Sprachen"
        }
      ],
      "default": [
        {
          fieldName: "abstractNote",
          label: "Beschreibung",
        },
        {
          fieldName: "language",
          label: "Sprachen"
        }
      ]
    }
  }

export default {toolbar, header, body}