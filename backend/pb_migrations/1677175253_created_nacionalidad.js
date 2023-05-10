migrate((db) => {
  const collection = new Collection({
    "id": "uw0met2984pptax",
    "created": "2023-02-23 18:00:53.498Z",
    "updated": "2023-02-23 18:00:53.498Z",
    "name": "nacionalidad",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hqcvyjuw",
        "name": "nacionalidad",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uw0met2984pptax");

  return dao.deleteCollection(collection);
})
