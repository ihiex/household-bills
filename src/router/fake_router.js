//TODO:有待完善

export default fakeRouter = {
    "router": [
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
            "path": "/example", //当有多级时一级可设为虚拟路径
            "component": "Layout",
            "redirect": "/example/home",
            "name": "Example",
            "meta": {
                "title": "案例",
                "icon": "example"
            },
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
                "component": "home/about/About",
                "meta": {
                    "title": "关于",
                    "icon": "about",
                },
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
