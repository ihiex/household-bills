export default {
    dbName: "family",                          // *数据库名称
    version: 1,                                 // 数据库版本号（默认为当前时间戳）
    tables: [                                   // *数据库的表，即ObjectStore
        {
            tableName: "srcData",                 // *表名
            option: { keyPath: "id" },          // 表配置，即ObjectStore配置，此处指明主键为id
            indexs: [                           // 数据库索引（建议加上索引）
                {
                    key: "id",                  // *索引名
                    option:{                    // 索引配置，此处表示该字段不允许重复
                        unique: true
                    }
                },
                {
                    key: "outName"
                },
                {
                    key: "inName"
                },
                {
                    key: "name"
                },
                {
                    key: "date"
                },
                {
                    key: "mode"
                },
                {
                    key: "list"
                }
            ]
        },
        {
            tableName: "userInfo",   // 用户列表
            option: { keyPath: "id" },
            indexs: [
                {
                    key: "id",
                    option:{
                        unique: true
                    }
                },
                {
                     key: "name"
                }
            ]
        },
        {
            tableName: "consumptionType",  //消费类型          
            option: { keyPath: "id" },
            indexs: [
                {
                    key: "id",
                    option:{
                        unique: true
                    }
                },
                {
                     key: "name"
                }
            ]
        },
        {
            tableName: "incomeType",  //收入类型                     
            option: { keyPath: "id" },
            indexs: [
                {
                    key: "id",
                    option:{
                        unique: true
                    }
                },
                {
                     key: "name"
                }
            ]
        }
    ]
};