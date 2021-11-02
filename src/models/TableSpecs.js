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
        id: "creators",
        label: "Author:innen",
        type: "list[CreatorObject]"
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

export class ZoteroTypeMapper {
  static #zoteroTypeMap = {
    fields: {
      itemType: {
        book: "Buch",
        journalArticle: "Artikel",
        default: "k.A."
      },
      creators: {
        creatorType: {
          author: "Autor:in",
          editor: "Herausgeber:in",
          contributor: "Mitarbeiter:in",
          default: "Beteiligte:r"
        }
      }
    }
  }
  static creatorTypeLabel(zoteroTypeString) {
    return ZoteroTypeMapper.#zoteroTypeMap.fields.creators.creatorType[zoteroTypeString]
      ? ZoteroTypeMapper.#zoteroTypeMap.fields.creators.creatorType[zoteroTypeString]
      : ZoteroTypeMapper.#zoteroTypeMap.fields.creators.creatorType.default
  }
  static itemTypeLabel(itemTypeString) {
    return ZoteroTypeMapper.#zoteroTypeMap.fields.itemType[itemTypeString]
      ? ZoteroTypeMapper.#zoteroTypeMap.fields.itemType[itemTypeString]
      : ZoteroTypeMapper.#zoteroTypeMap.fields.itemType.default
  }
}

export default {toolbar, header, body, ZoteroTypeMapper}