## 1. 插件介绍

根据个人使用习惯对论坛妖火网进行增强包含以下下功能：

- 发帖 ubb 增强
- 回帖 ubb 增强
- 查看贴子增强
- 自动吃肉增强
- 浏览贴子增强
- 自动加载更多帖子
- 自动加载更多回复
- 功能个性化配置
  > 参考了以下大佬代码：外卖不用券(id:23825)、侯莫晨、Swilder-M，特此感谢

## 2. 功能描述

1. 贴子列表、贴子页、回复页支持自动加载更多、最大加载数量内自动加载（默认 150 条可单独配置），达到最大加载数量则不会自动加载。
2. 支持半自动吃肉，和全自动吃肉。区别是半自动吃肉需要手动点进肉帖，才会自动吃肉；而全自动吃肉会在当前页面自动点肉帖进去并自动回复吃肉，吃完再返回列表页面，每隔一段检测新肉帖并自动吃肉（默认 60 秒可单独配置）。
3. 全自动吃肉默认当前页面内自动点肉帖进去自动吃肉，可更改静默无跳转自动吃肉，通过 iframe 实现，全程无感
4. 吃过的肉帖。自己手动提交会弹窗提示已吃过肉，是否确认提交
5. 自动记忆所有吃过的肉帖，在配置天数内（默认一天可单独配置），吃过的肉帖不会重复吃肉。
6. 贴子页显示楼主等级（默认打开）
7. 支持自动加载更多+全自动吃肉+全自动无跳转同时开启。自动加载更多的同时自动无跳转吃肉
8. 增加可配置菜单，默认移动端开启，悬浮在右上角，PC 端不打开。所有功能都能单独开启和关闭，兼容其他插件，可以和其他插件一起使用，关闭本插件的相同功能即可。
