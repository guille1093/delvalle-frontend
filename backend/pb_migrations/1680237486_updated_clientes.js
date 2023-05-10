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
      "min": 8,
      "max": 8,
      "pattern": ""
    }
  }))

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
    "id": "mrpa9bvx",
    "name": "fechanacimiento",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h8iaeul1",
    "name": "domicilio",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 100,
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
    "id": "aob2633s",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": true,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
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
    "required": true,
    "unique": false,
    "options": {
      "min": 8,
      "max": 8,
      "pattern": ""
    }
  }))

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
    "id": "mrpa9bvx",
    "name": "fechanacimiento",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h8iaeul1",
    "name": "domicilio",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 2,
      "max": 100,
      "pattern": ""
    }
  }))

  // update
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

  // update
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

  return dao.saveCollection(collection)
})
