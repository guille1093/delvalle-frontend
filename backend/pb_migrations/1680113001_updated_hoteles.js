migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fauwreko",
    "name": "observaciones",
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
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90")

  // remove
  collection.schema.removeField("fauwreko")

  return dao.saveCollection(collection)
})
