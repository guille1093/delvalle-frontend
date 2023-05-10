migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90")

  // remove
  collection.schema.removeField("obqqchdf")

  // remove
  collection.schema.removeField("hsdw3n9p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bphjax5k",
    "name": "thumbnail",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90")

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

  // remove
  collection.schema.removeField("bphjax5k")

  return dao.saveCollection(collection)
})
