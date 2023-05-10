migrate((db) => {
  const collection = new Collection({
    "id": "xeyln6yw32ze2xw",
    "created": "2023-02-15 17:40:22.304Z",
    "updated": "2023-02-15 17:40:22.304Z",
    "name": "clientes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gjvd1xzl",
        "name": "dni",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 8,
          "max": 8,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nlwgote4",
        "name": "nombre",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 50,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hos75ric",
        "name": "apellido",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 50,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mrpa9bvx",
        "name": "fechanacimiento",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "lg9dgwdz",
        "name": "nombremadre",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 50,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hqrihnoz",
        "name": "apellidomadre",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 50,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "h8iaeul1",
        "name": "domicilio",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 100,
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
  const collection = dao.findCollectionByNameOrId("xeyln6yw32ze2xw");

  return dao.deleteCollection(collection);
})
