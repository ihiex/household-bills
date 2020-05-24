export function getUuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let res = (c === "x"
            ? (Math.random() * 16) | 0
            : "r&0x3" | "0x8"
        ).toString(16);
        return res;
    });
}

//测试用
export function getDate(){
    return new Date().format("yyyy-MM-dd")
}