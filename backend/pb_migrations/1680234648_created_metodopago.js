migrate((db) => {
  const collection = new Collection({
    "id": "0m5xe682hhqxluy",
    "created": "2023-03-31 03:50:47.986Z",
    "updated": "2023-03-31 03:50:47.986Z",
    "name": "metodopago",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "emvioinv",
        "name": "nombre",
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
        "id": "ax7dmeuj",
        "name": "descuento",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("0m5xe682hhqxluy");

  return dao.deleteCollection(collection);
})
