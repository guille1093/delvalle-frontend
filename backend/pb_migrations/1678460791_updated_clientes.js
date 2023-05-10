migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "axjhezpd",
    "name": "sexo",
    "type": "text",
    "required": true,
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "axjhezpd",
    "name": "sexo",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 2,
      "max": 8,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
