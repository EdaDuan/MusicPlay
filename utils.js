exports.cssTemplateFunction = (data) => {
  const shared = ".icon { background-image: url(I); }".replace(
    "I",
    data.sprites[0].image
  );
  // 注意：此处默认图标使用的是二倍图
  const perSprite = data.sprites
    .map(function(sprite) {
      // background-size: SWpx SHpx;
      return (
        ".icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx;}"
          // return '.icon-N { width: SWpx; height: SHpx; background-position: Xpx Ypx;}\n.icon-N .icon, .icon-N.icon { width: Wpx; height: Hpx; background-position: Xpx Ypx; } '
          .replace(/N/g, sprite.name)
          .replace(/SW/g, sprite.width / 2)
          .replace(/SH/g, sprite.height / 2)
          .replace(/W/g, sprite.width)
          .replace(/H/g, sprite.height)
          .replace(/X/g, sprite.offset_x)
          .replace(/Y/g, sprite.offset_y)
      );
    })
    .join("\n");
  return shared + "\n" + perSprite;
};

exports.scssTemplateFunction = (data) => {
  // console.log(data, '==========', data.spritesheet)
  const mixs = ` @function px2rem($px) {
                  $rem :40;
                  @return #{$px/$rem}rem
                }`;
  const shared = ".icon { background-image: url(I); background-size: px2rem(W) px2rem(H);}"
    .replace("I", data.sprites[0].image)
    .replace(/W/g, data.spritesheet.width)
    .replace(/H/g, data.spritesheet.height);
  // 注意：此处默认图标使用的是二倍图
  const perSprite = data.sprites
    .map(function(sprite) {
      return ".icon-N { width: px2rem(W); height: px2rem(H); background-position: px2rem(X) px2rem(Y);} "
        .replace(/N/g, sprite.name)
        .replace(/SW/g, sprite.width / 2)
        .replace(/SH/g, sprite.height / 2)
        .replace(/W/g, sprite.width)
        .replace(/H/g, sprite.height)
        .replace(/X/g, sprite.offset_x)
        .replace(/Y/g, sprite.offset_y);
    })
    .join("\n");
  console.log(perSprite);
  return mixs + "\n" + shared + "\n" + perSprite;
};
