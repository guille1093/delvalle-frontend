migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wugb1alj",
    "name": "pais",
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
    "id": "qx0daiyt",
    "name": "direccion",
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
    "id": "smfuyxo0",
    "name": "telefono",
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
    "id": "yfqi8szu",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "obqqchdf",
    "name": "tarifa",
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
    "id": "hsdw3n9p",
    "name": "comprobante",
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
  collection.schema.removeField("wugb1alj")

  // remove
  collection.schema.removeField("qx0daiyt")

  // remove
  collection.schema.removeField("smfuyxo0")

  // remove
  collection.schema.removeField("yfqi8szu")

  // remove
  collection.schema.removeField("obqqchdf")

  // remove
  collection.schema.removeField("hsdw3n9p")

  return dao.saveCollection(collection)
})
