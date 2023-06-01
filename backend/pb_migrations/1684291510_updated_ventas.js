migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i62t7x70uzvc2yi")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkrmmows",
    "name": "cliente",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "xeyln6yw32ze2xw",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "nombre"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i62t7x70uzvc2yi")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkrmmows",
    "name": "cliente",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "xeyln6yw32ze2xw",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
