migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nlwgote4",
    "name": "nombre",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 2,
      "max": 50,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f4zx8sm4",
    "name": "telefono",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 6,
      "max": 20,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ra6ipboi",
    "name": "ocupacion",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nlwgote4",
    "name": "nombre",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 50,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f4zx8sm4",
    "name": "telefono",
    "type": "text",
    "required": false,
    "unique": true,
    "options": {
      "min": 6,
      "max": 20,
      "pattern": ""
    }
  }))

  // update
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

  return dao.saveCollection(collection)
})
