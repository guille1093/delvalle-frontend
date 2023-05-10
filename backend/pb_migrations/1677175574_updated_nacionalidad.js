migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uw0met2984pptax")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hqcvyjuw",
    "name": "codpais",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hqcvyjuw",
    "name": "nacionalidad",
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
})
