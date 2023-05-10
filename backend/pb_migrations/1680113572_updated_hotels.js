migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nkp7sgch",
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
    "id": "b5jeneyh",
    "name": "fecha_desde",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dtfvk2br",
    "name": "fecha_hasta",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90")

  // remove
  collection.schema.removeField("nkp7sgch")

  // remove
  collection.schema.removeField("b5jeneyh")

  // remove
  collection.schema.removeField("dtfvk2br")

  return dao.saveCollection(collection)
})
