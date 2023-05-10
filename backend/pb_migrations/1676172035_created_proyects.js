migrate((db) => {
  const collection = new Collection({
    "id": "8bul3agqrabl6d8",
    "created": "2023-02-12 03:20:35.816Z",
    "updated": "2023-02-12 03:20:35.816Z",
    "name": "proyects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "o3jwviex",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 64,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "krpppti3",
        "name": "tagline",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
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
  const collection = dao.findCollectionByNameOrId("8bul3agqrabl6d8");

  return dao.deleteCollection(collection);
})
