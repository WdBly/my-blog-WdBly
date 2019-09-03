
var OpenCC = require("opencc");
var fn;
export const translation = async (content, type) => {

    if(type === "s2t") {
        fn = new OpenCC("s2t.json");
    }else if(type === "t2s") {
        fn = new OpenCC("t2s.json");
    }

    let destContent = fn.convertSync(content);
    
    return destContent;
}