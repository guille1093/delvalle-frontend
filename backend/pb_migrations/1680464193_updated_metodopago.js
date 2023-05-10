migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0m5xe682hhqxluy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n5nh8jxq",
    "name": "observaciones",
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
    "id": "cfnax1ag",
    "name": "estado",
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
  const collection = dao.findCollectionByNameOrId("0m5xe682hhqxluy")

  // remove
  collection.schema.removeField("n5nh8jxq")

  // remove
  collection.schema.removeField("cfnax1ag")

  return dao.saveCollection(collection)
})
