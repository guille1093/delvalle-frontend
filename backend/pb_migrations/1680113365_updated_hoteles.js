migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90")

  collection.name = "hotels"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90")

  collection.name = "hoteles"

  return dao.saveCollection(collection)
})
