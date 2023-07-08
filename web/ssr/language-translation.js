var OpenCC = require("opencc");
var fn;
export const translation = async (content, type) => {

    let value = `${type}.json`
    fn = new OpenCC(value);

    return new Promise((resolve, reject) => {
        fn.convert(content, function(err, converted) {
            if(err){
                reject("出错了" + err);
                return;
            }
            resolve(converted);
        }); 
    })
}