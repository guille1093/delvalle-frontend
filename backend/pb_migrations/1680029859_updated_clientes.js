migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0tmwy6w0",
    "name": "lugarascenso",
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
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw")

  // remove
  collection.schema.removeField("0tmwy6w0")

  return dao.saveCollection(collection)
})
