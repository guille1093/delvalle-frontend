migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i62t7x70uzvc2yi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xptgdgt4",
    "name": "pagado",
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
  const collection = dao.findCollectionByNameOrId("i62t7x70uzvc2yi")

  // remove
  collection.schema.removeField("xptgdgt4")

  return dao.saveCollection(collection)
})
