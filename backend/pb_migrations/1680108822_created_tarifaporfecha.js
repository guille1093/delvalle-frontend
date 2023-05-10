migrate((db) => {
  const collection = new Collection({
    "id": "9u79mjqrtd6vch2",
    "created": "2023-03-29 16:53:42.276Z",
    "updated": "2023-03-29 16:53:42.276Z",
    "name": "tarifaporfecha",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pbmxzcyw",
        "name": "tarifa",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ysyown8l",
        "name": "fechadesde",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "3f3rfckb",
        "name": "fechahasta",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "y8wx7znl",
        "name": "hotel",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "qdfjsstvbo1qn90",
          "cascadeDelete": true,
          "maxSelect": null,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("9u79mjqrtd6vch2");

  return dao.deleteCollection(collection);
})
