migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i62t7x70uzvc2yi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kmtizzzh",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gfepoelx",
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
  const collection = dao.findCollectionByNameOrId("i62t7x70uzvc2yi")

  // remove
  collection.schema.removeField("kmtizzzh")

  // remove
  collection.schema.removeField("gfepoelx")

  return dao.saveCollection(collection)
})
