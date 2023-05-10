migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw")

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pntexlr9",
    "name": "field",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw")

  // remove
  collection.schema.removeField("axjhezpd")

  // remove
  collection.schema.removeField("pntexlr9")

  return dao.saveCollection(collection)
})
