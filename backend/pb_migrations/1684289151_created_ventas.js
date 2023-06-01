migrate((db) => {
  const collection = new Collection({
    "id": "i62t7x70uzvc2yi",
    "created": "2023-05-17 02:05:51.880Z",
    "updated": "2023-05-17 02:05:51.880Z",
    "name": "ventas",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bkrmmows",
        "name": "cliente",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "xeyln6yw32ze2xw",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "dj6iaat7",
        "name": "paquete",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "8bul3agqrabl6d8",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i62t7x70uzvc2yi");

  return dao.deleteCollection(collection);
})
