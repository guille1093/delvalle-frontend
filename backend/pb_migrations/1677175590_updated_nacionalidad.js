migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uw0met2984pptax")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zpjjxez0",
    "name": "destpais",
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
  const collection = dao.findCollectionByNameOrId("uw0met2984pptax")

  // remove
  collection.schema.removeField("zpjjxez0")

  return dao.saveCollection(collection)
})
