//TODO:有待完善

export default {
    routers: [
        {
            "path": "",
            "component": "Layout",
            "redirect": "dashboard",
            "children": [{
                "path": "dashboard",
                "component": "dashboard/index",
                "meta": {
                    "title": "首页",
                    "icon": "dashboard"
                }
            }]
        },
        {
            path: '/dataEntry',
            component: 'Layout',
            redirect: 'dataentry',
            name: 'dataEntry',
            children: [{
                path: 'dataentry',
                component: 'dataentry/index',
                meta: {
                    title: '数据录入',
                    icon: 'el-icon-edit'
                }
            }],
        },
        {
            path: '/dataLists',
            component: 'Layout',
            redirect: 'datalists',
            name: 'dataLists',
            children: [{
                path: 'datalists',
                component: 'datalists/index',
                meta: {
                    title: '数据列表',
                    icon: 'el-icon-edit'
                }
            }],
        },
        {
            path: '/dataItem',
            component: 'Layout',
            redirect: 'dataitem',
            name: 'dataitem',
            children: [{
                path: 'dataitem',
                component: 'dataitem/index',
                meta: {
                    title: '数据字典',
                    icon: 'el-icon-edit'
                }
            }],
        },

        {
            "path": "/example", //当有多级时一级可设为虚拟路径
            "component": "Layout",
            "redirect": "/example/home",
            "name": "Example",
            "meta": {
                "title": "案例",
                "icon": "example"
            },
            // hidden: true, //是否显示
            "children": [{
                "path": "index",
                "name": "home",
                "component": "home/Home",
                "meta": {
                    "title": "家",
                    "icon": "home"
                }
            },
            {
                "path": "about",
                "name": "about",
                component: 'home/about/About',
                // "redirect": "about",
                "meta": {
                    "title": "关于",
                    "icon": "about",
                },
                /* children: [
                    {
                        path: 'about',
                        component: 'home/about/About',
                        name: 'about',
                        "meta": {
                            "title": "关于",
                            "icon": "about",
                        },
                    },
                    {
                        path: 'hello',
                        component: 'home/about/hello/helloworld',
                        name: 'hello',
                        "meta": {
                            "title": "hello",
                            "icon": "about",
                        },
                    },
                ] */
                // hidden: true
            }
            ]
        },
        {
            "path": "*",
            "redirect": "/404",
            "hidden": true
        }
    ]
}
