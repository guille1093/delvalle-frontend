migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f4zx8sm4",
    "name": "telefono",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 6,
      "max": 20,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aob2633s",
    "name": "email",
    "type": "email",
    "required": true,
    "unique": true,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ra6ipboi",
    "name": "ocupacion",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 2,
      "max": 50,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1k8nysaz",
    "name": "nacionalidad",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 50,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw")

  // remove
  collection.schema.removeField("f4zx8sm4")

  // remove
  collection.schema.removeField("aob2633s")

  // remove
  collection.schema.removeField("ra6ipboi")

  // remove
  collection.schema.removeField("1k8nysaz")

  return dao.saveCollection(collection)
})
