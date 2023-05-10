migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9u79mjqrtd6vch2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y8wx7znl",
    "name": "hotel",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qdfjsstvbo1qn90",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9u79mjqrtd6vch2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y8wx7znl",
    "name": "hotel",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "qdfjsstvbo1qn90",
      "cascadeDelete": true,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
