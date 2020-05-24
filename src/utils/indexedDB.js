//已弃用

    import { Message, MessageBox } from 'element-ui'

    let indexObj = {
        name: "spectaculars",
        version: 2020,
        indexedDB: null,
        db: null,
        request: null
    }
    /* let indexedName = ;
    let version = 2020;
    let indexedDB;
    let db;
    let request; */

   (function constructor() {
      //获取数据库
      indexObj.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || null;; //兼容写法
      //创建数据库
      indexObj.request = indexObj.indexedDB.open(indexObj.name, indexObj.version);
  
      indexObj.request.onerror = (event) => {
        // common.openSnackBar("indexedDb创建失败.");
        Message({
          message: "indexedDb创建失败",
          type: 'error',
          duration: 5 * 1000
        })
      }
      indexObj.request.onsuccess = (event) => {
        indexObj.db = indexObj.request.result;
      }
      indexObj.request.onupgradeneeded = (event) => {
        indexObj.db = event.target.result;
        if (!indexObj.db.objectStoreNames.contains(indexObj.name)) {
          let objectStore = indexObj.db.createObjectStore(indexObj.name, { autoIncrement: true });
          objectStore.createIndex('name', 'name', { unique: false });
          objectStore.createIndex('email', 'email', { unique: true });
        }
      }
    })()
  
    /**
     *添加数据
     *参数说明
     * @param {*} [datas={}] 参数为一个json
     * @returns 成功返回1 失败返回-1
     * @memberof IndexedDBService
     */
    function add(datas) {
      let req = indexObj.db.transaction([indexObj.name], 'readwrite')
        .objectStore(indexObj.name)
        .add(datas);
      return new Promise((resolve, reject) => {
        req.onsuccess = function (event) {
          resolve(1);
        };
  
        req.onerror = function (event) {
          reject(-1)
        }
      })
    }
  
    /**
     *根据id删除数据
     *参数说明
     * @param {*} id 
     * @returns 成功返回1 失败返回-1
     * @memberof IndexedDBService
     */
    function del(id) {
      let req = indexObj.db.transaction([indexObj.name], 'readwrite')
        .objectStore(indexObj.name)
        .delete(id);
  
      return new Promise((resolve, reject) => {
        req.onsuccess = function (event) {
          resolve(1);
        };
        req.onerror = function (event) {
          reject(-1)
        }
      })
    }
  
    /**
     *修改数据
     *参数说明
     * @param {*} [data={}] 
     * @returns 成功返回1 失败返回－1
     * @memberof IndexedDBService
     */
   function update(data) {
      let req = indexObj.db.transaction([indexObj.name], 'readwrite')
        .objectStore(indexObj.name)
        .put(data);
  
      return new Promise((resolve, reject) => {
        req.onsuccess = function (event) {
          resolve(1);
        };
        req.onerror = function (event) {
          reject(-1)
        }
      })
    }
  
    /**
     *根据id读取数据
     *参数说明
     * @param {*} id 
     * @returns 成功返回结果，失败返回-1
     * @memberof IndexedDBService
     */
   function read(id) {
      let req = indexObj.db.transaction([indexObj.name])
        .objectStore(indexObj.name)
        .get(id);
  
      return new Promise((resolve, reject) => {
        req.onsuccess = (event) => {
          resolve(req.result);
        }
        req.onerror = (event) => {
          reject(-1)
        }
      })
    }
  
    //TODO:"无法获取所有数据，待修改"
    /**
     *获取所有数据
     *参数说明 无
     * @returns 成功返回所有数据 失败返回-1
     * @memberof IndexedDBService
     */
   function readAll() {
      let req = indexObj.db.transaction(indexObj.name)
        .objectStore(indexObj.name)
        .openCursor();
  
      return new Promise((resolve, reject) => {
        req.onsuccess = (event)=> {
          let cursor = event.target.result;
          console.log(event);
          /* cursor.continue(); */
          resolve(cursor);
        }
        req.onerror = (event)=>{
          reject(-1);
        }
      })
    }

    export default {add,update,del,read,readAll}