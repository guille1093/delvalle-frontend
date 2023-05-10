migrate((db) => {
  const collection = new Collection({
    "id": "qdfjsstvbo1qn90",
    "created": "2023-03-28 22:58:24.422Z",
    "updated": "2023-03-28 22:58:24.422Z",
    "name": "hoteles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zjwxv1od",
        "name": "nombre",
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
  const collection = dao.findCollectionByNameOrId("qdfjsstvbo1qn90");

  return dao.deleteCollection(collection);
})
