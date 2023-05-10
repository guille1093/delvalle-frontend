migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bul3agqrabl6d8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jzhogw1e",
    "name": "description",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 2,
      "max": 1019,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qggiswdx",
    "name": "url",
    "type": "url",
    "required": true,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s7mvqewq",
    "name": "tumnail",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": [
        "80x80"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8bul3agqrabl6d8")

  // remove
  collection.schema.removeField("jzhogw1e")

  // remove
  collection.schema.removeField("qggiswdx")

  // remove
  collection.schema.removeField("s7mvqewq")

  return dao.saveCollection(collection)
})
