// const path = require("path");
// //引入node模块，一会要操作文件，输入，生成，输出都需要这玩意。
// const SpritesmithPlugin = require("webpack-spritesmith");
// const templateFunction = function(data) {
//   var shared = ".icon { display: inline-block; vertical-align: middle; background-image: url(I) }".replace(
//     "I",
//     data.sprites[0].image
//   );

//   var perSprite = data.sprites
//     .map(function(sprite) {
//       return ".icon-N { width: Wrem; height: Hrem; background-position: Xrem Yrem; background-size: TW TH;}"
//         .replace("N", sprite.name)
//         .replace("W", sprite.width/40)
//         .replace("H", sprite.height/40)
//         .replace("X", sprite.offset_x/40)
//         .replace("Y", sprite.offset_y/40)
//         .replace("TW", sprite.px.total_width)
//         .replace("TH", sprite.px.total_height);
//     })
//     .join("\n");

//   return shared + "\n" + perSprite;
// };

// module.exports = {
//   chainWebpack: config => {
//     // 将小图标拼接成雪碧图
//     config.plugin("webpack-spritesmith").use(SpritesmithPlugin, [
//       {
//         src: {
//           cwd: "./src/assets/images/listIcon/",
//           glob: "*.png"
//         },
//         target: {
//           image: "./src/assets/images/sprite/list_sprite.png",
//           css: [
//             [
//               path.resolve(__dirname, "./src/assets/scss/icon/list_sprite.scss"),
//               {
//                 // 引用自己的模板
//                 format: "function_based_template"
//               }
//             ]
//           ]
//         },
//         apiOptions: {
//           cssImageRef: "../../images/sprite/list_sprite.png"
//         },
//         customTemplates: {
//           function_based_template: templateFunction
//         },
//         spritesmithOptions: {
//           algorithm: "binary-tree",
//           padding: 40
//         }
//       }
//     ]);
//   }
// }
module.exports = {
  publicPath: './'
}