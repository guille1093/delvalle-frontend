migrate((db) => {
  const collection = new Collection({
    "id": "45ivpd3j2alqcas",
    "created": "2023-02-23 17:57:54.234Z",
    "updated": "2023-02-23 17:57:54.234Z",
    "name": "sexo",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zsupt0iq",
        "name": "sexo",
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
  const collection = dao.findCollectionByNameOrId("45ivpd3j2alqcas");

  return dao.deleteCollection(collection);
})
