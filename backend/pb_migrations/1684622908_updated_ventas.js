migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i62t7x70uzvc2yi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pvrohhng",
    "name": "cant_personas",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i62t7x70uzvc2yi")

  // remove
  collection.schema.removeField("pvrohhng")

  return dao.saveCollection(collection)
})
