migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bul3agqrabl6d8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iwcfakfh",
    "name": "nombre",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cillnhiv",
    "name": "fecha_llegada",
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
    "id": "o08zbeey",
    "name": "fecha_salida",
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
    "id": "rlavw71c",
    "name": "precio",
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
    "id": "ubounplk",
    "name": "cant_dias",
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
    "id": "skv9go5p",
    "name": "cant_noches",
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
    "id": "tbh6xe2g",
    "name": "regimen",
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
  const collection = dao.findCollectionByNameOrId("8bul3agqrabl6d8")

  // remove
  collection.schema.removeField("iwcfakfh")

  // remove
  collection.schema.removeField("cillnhiv")

  // remove
  collection.schema.removeField("o08zbeey")

  // remove
  collection.schema.removeField("rlavw71c")

  // remove
  collection.schema.removeField("ubounplk")

  // remove
  collection.schema.removeField("skv9go5p")

  // remove
  collection.schema.removeField("tbh6xe2g")

  return dao.saveCollection(collection)
})
