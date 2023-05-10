migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bul3agqrabl6d8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ybh3tdsf",
    "name": "estado",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bul3agqrabl6d8")

  // remove
  collection.schema.removeField("ybh3tdsf")

  return dao.saveCollection(collection)
})
