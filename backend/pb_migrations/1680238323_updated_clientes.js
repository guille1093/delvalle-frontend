migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gjvd1xzl",
    "name": "dni",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 7,
      "max": 10,
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
    "id": "gjvd1xzl",
    "name": "dni",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 8,
      "max": 8,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
