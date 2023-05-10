migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bul3agqrabl6d8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "od3k3zd8",
    "name": "fechasalida",
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
    "id": "gnjmxz4b",
    "name": "fecharetorno",
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
  const collection = dao.findCollectionByNameOrId("8bul3agqrabl6d8")

  // remove
  collection.schema.removeField("od3k3zd8")

  // remove
  collection.schema.removeField("gnjmxz4b")

  return dao.saveCollection(collection)
})
