migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uw0met2984pptax")

  collection.name = "nacionalidades"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uw0met2984pptax")

  collection.name = "nacionalidad"

  return dao.saveCollection(collection)
})
