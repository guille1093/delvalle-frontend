migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uw0met2984pptax")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uw0met2984pptax")

  collection.createRule = null

  return dao.saveCollection(collection)
})
