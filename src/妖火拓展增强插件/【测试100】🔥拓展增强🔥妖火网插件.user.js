// ==UserScript==
// @name        【测试100】🔥拓展增强🔥妖火网插件
// @namespace    https://yaohuo.me/
// @version      1.0.1
// @description  🔥拓展增强🔥妖火网插件兼容版本
// @author       龙少c(id:20469)
// @match        *://yaohuo.me/*
// @match        *://*.yaohuo.me/*
// @icon         https://yaohuo.me/css/favicon.ico
// @license      MIT
// ==/UserScript==

// 引入jQuery

// jQuery 加载后再执行

let settingData = {
  // 是否显示站内图标
  isShowSettingIcon: true,
  // 是否开启自动吃肉，手动进去肉帖自动吃肉
  isAutoEat: false,
  // 全自动吃肉是否无跳转通过iframe吃肉，否则直接当前页面跳转打开肉帖吃肉。
  isNewOpenIframe: false,
  // 帖子里是否显示用户等级
  isShowLevel: true,
  // 刷新时间间隔
  timeInterval: 60,
  // 设置肉帖过期时间，过期前不会再自动吃肉
  expiredDays: 1,
  // 是否自动加载下一页
  isLoadNextPage: false,
  // 加载按钮方式: more / nextPage
  loadNextPageType: isMobile() ? "more" : "nextPage",
  // 一页最大的加载数量，超过数量就不会自动加载
  maxLoadNum: 150,
  // 滑块range最小和最大值
  minNumRange: 50,
  maxNumRange: 500,
  numStep: 50,
  // 设置悬浮按钮位置
  settingBtnLeft: 0,
  settingBtnTop: 0,
  // 按钮的响应试大小，单位vw，默认18vw
  settingIconResponsiveSize: 18,
  // 按钮最大的大小，单位px，默认100px
  settingIconMaxSize: 100,

  // 自动加载页面时是否执行尾部
  isExecTrail: true,

  // 是否增加发帖ubb
  isAddNewPostUBB: true,
  // 是否增加回帖ubb
  isAddReplyUBB: true,
  // 是否默认展开表情
  isUnfoldFace: true,
  // 是否默认展开表情
  isUnfoldUbb: false,
};
let yaohuo_userData = null;
// 数据初始化
initSetting();

let {
  isAutoEat,
  isShowLevel,
  timeInterval,
  expiredDays,
  isLoadNextPage,
  isExecTrail,

  maxLoadNum,
  minNumRange,
  maxNumRange,
  numStep,

  isShowSettingIcon,

  settingBtnLeft,
  settingBtnTop,

  settingIconMaxSize,
  settingIconResponsiveSize,

  isAddNewPostUBB,
  isAddReplyUBB,
  isUnfoldFace,
  isUnfoldUbb,

  loadNextPageType,
} = yaohuo_userData;

// 存储吃过肉的id，如果吃过肉则不会重复吃肉
let autoEatList = getItem("autoEatList");
// 回复页
const viewPage = ["/bbs/book_re.aspx", "/bbs/book_view.aspx"];
// 帖子列表页面
const bbsPage = ["/bbs/book_list.aspx", "/bbs/list.aspx"];
// 发帖
const postPage = [
  "/bbs/book_view_add.aspx",
  "/bbs/book_view_sendmoney.aspx",
  "/bbs/book_view_addvote.aspx",
  "/bbs/book_view_addfile.aspx",
  "/bbs/book_view_mod.aspx",
];
const loadNextPage = [
  /\/bbs\/book_re.aspx/,
  /\/bbs\/book_list.aspx/,
  /\/bbs\/list.aspx/,
  /\/bbs-.*\.html/,
];
// 404
const notFoundPage = ["/404.htm"];
const faceList = [
  "踩.gif",
  "狂踩.gif",
  "淡定.gif",
  "囧.gif",
  "不要.gif",
  "重拳出击.gif",
  "砳砳.gif",
  "滑稽砳砳.gif",
  "沙发.gif",
  "汗.gif",
  "亲亲.gif",
  "太开心.gif",
  "酷.gif",
  "思考.gif",
  "发呆.gif",
  "得瑟.gif",
  "哈哈.gif",
  "泪流满面.gif",
  "放电.gif",
  "困.gif",
  "超人.gif",
  "害羞.gif",
  "呃.gif",
  "哇哦.gif",
  "要死了.gif",
  "谢谢.gif",
  "抓狂.gif",
  "无奈.gif",
  "不好笑.gif",
  "呦呵.gif",
  "感动.gif",
  "喜欢.gif",
  "疑问.gif",
  "委屈.gif",
  "你不行.gif",
  "流口水.gif",
  "潜水.gif",
  "咒骂.gif",
  "耶耶.gif",
  "被揍.gif",
  "抱走.gif",
];
const diyFaceList = [
  {
    url: "https://i.ibb.co/hXBXGq8/jy.gif",
    name: "摸鱼",
  },
  {
    url: "https://i.ibb.co/L0scf9m/jw.gif",
    name: "稽舞",
  },
  {
    url: "https://i.ibb.co/rmQY19V/sj.gif",
    name: "色稽",
  },
  {
    url: "https://i.ibb.co/h14QP4d/jj.gif",
    name: "撒娇",
  },
  {
    url: "https://i.ibb.co/9yD4mFW/jg.gif",
    name: "稽狗",
  },
  {
    url: "https://i.ibb.co/CnNY1SG/mq.gif",
    name: "没钱",
  },
  {
    url: "https://i.ibb.co/0qTfStm/sw.gif",
    name: "骚舞",
  },
  {
    url: "https://i.ibb.co/yh8bSx7/cs.gif",
    name: "吃屎",
  },
  {
    url: "https://i.ibb.co/3BxqbXX/bs.gif",
    name: "鄙视",
  },
  {
    url: "https://i.ibb.co/3NrbQfQ/tg.gif",
    name: "听歌",
  },
  {
    url: "https://i.ibb.co/whDBFQd/st.gif",
    name: "伸头",
  },
  {
    url: "https://i.ibb.co/7KzRsmd/gz.gif",
    name: "鼓掌",
  },
  {
    url: "https://i.ibb.co/KNGfHFw/tt.gif",
    name: "踢腿",
  },
  {
    url: "https://i.ibb.co/sKS4R3x/nt.png",
    name: "男同",
  },
  {
    url: "https://i.ibb.co/VCWLFgz/sq.gif",
    name: "手枪",
  },
  {
    url: "https://i.ibb.co/pjw803c/pt.gif",
    name: "拍头",
  },
  {
    url: "https://i.ibb.co/fNcvwj0/tp.gif",
    name: "躺平",
  },
  {
    url: "https://i.ibb.co/5jJwwdQ/zj.gif",
    name: "追稽",
  },
  {
    url: "https://i.ibb.co/mRLMkyv/lsj.gif",
    name: "司稽",
  },
  {
    url: "https://i.ibb.co/7KKybVg/qt.gif",
    name: "乞讨",
  },
  {
    url: "https://i.ibb.co/3r8mtKh/gj.gif",
    name: "跪稽",
  },
  {
    url: "https://i.ibb.co/PWMFdB8/dn.gif",
    name: "刀你",
  },
  {
    url: "https://i.ibb.co/BcHh8kn/dp.gif",
    name: "冲刺",
  },
  {
    url: "https://i.ibb.co/LDycW8K/zq.gif",
    name: "转圈",
  },
  {
    url: "https://i.ibb.co/7gNd669/cj.gif",
    name: "吃稽",
  },
  {
    url: "https://i.ibb.co/7S2T2pF/fj.gif",
    name: "犯贱",
  },
  {
    url: "https://i.ibb.co/yFtQtLM/nb.gif",
    name: "牛掰",
  },
  {
    url: "https://i.ibb.co/FVnL0PB/yb.gif",
    name: "拥抱",
  },
];
// 批量添加事件数组
let addEventAry = [
  {
    id: "ubb_id",
    ubb: "[userid]",
    offset: 0,
  },
  {
    id: "ubb_ip",
    ubb: "[ip]",
    offset: 0,
  },
  {
    id: "ubb_url",
    ubb: "[url=网址]文字说明[/url]",
    offset: 6,
  },
  {
    id: "ubb_text",
    ubb: "[text]全角转半角：代码内容[/text]",
    offset: 0,
  },
  {
    id: "ubb_br",
    ubb: "///",
    offset: 0,
  },
  {
    id: "ubb_hr",
    ubb: "[hr]",
    offset: 0,
  },
  {
    id: "ubb_left",
    ubb: "[left]",
    offset: 0,
  },
  {
    id: "ubb_center",
    ubb: "[center]",
    offset: 0,
  },
  {
    id: "ubb_right",
    ubb: "[right]",
    offset: 0,
  },
  {
    id: "ubb_font",
    ubb: "[font=serif][/font]",
    offset: 7,
  },
  {
    id: "ubb_b",
    ubb: "[b]加粗文字[/b]",
    offset: 4,
  },
  {
    id: "ubb_i",
    ubb: "[i]斜体文字[/i]",
    offset: 4,
  },
  {
    id: "ubb_u",
    ubb: "[u]下划线文字[/u]",
    offset: 0,
  },
  {
    id: "ubb_color",
    ubb: "[forecolor=red]颜色文字，默认红[/forecolor]",
    offset: 12,
  },
  {
    id: "ubb_img",
    ubb: "[img]图片链接[/img]",
    offset: 6,
  },
  {
    id: "ubb_strike",
    ubb: "[strike]删除线文字[/strike]",
    offset: 9,
  },
  {
    id: "ubb_call",
    ubb: "[call]拨号手机号码[/call]",
    offset: 0,
  },
  {
    id: "ubb_sms",
    ubb: "[url=sms:手机号码?body=短信内容]点此发送[/url]",
    offset: 0,
  },
  {
    id: "ubb_now",
    ubb: "当前系统日期和时间：[now]",
    offset: 0,
  },
  {
    id: "ubb_codo",
    ubb: "倒计天：[codo]2030-01-01[/codo]",
    offset: 0,
  },
  {
    id: "ubb_audio",
    ubb: "[audio=X]音频直链地址[/audio]",
    offset: 8,
  },
  {
    id: "ubb_movie",
    ubb: "[movie=100%*100%]视频直链地址|封面图片地址[/movie]",
    offset: 8,
  },
  {
    id: "ubb_nzgsa",
    ubb: "[audio=X]https://file.uhsea.com/2304/3deb45e90564252bf281f47c7b47a153KJ.mp3[/audio]",
    offset: 0,
  },
];

let timer = null;

// 是否点击加载更多
let isClickLoadMoreBtn = false;
// 是否是新页面
let isNewPage = false;

const spanstyle =
  "color: #fff; padding: 2px 4px; font-size: 14px; background-color: #ccc;border-radius: 10%;";
const a2style =
  "color: #fff; padding: 2px 4px; font-size: 14px; background-color: #d19275;border-radius: 10%;";
const a3style =
  "color: #fff; padding: 2px 4px; font-size: 14px; background-color: #66ccff;border-radius: 10%;";
// ==主代码执行==
(function () {
  // 处理浏览器滚动条事件
  // handleWindowScroll();
  // 处理窗口改变事件
  // handleWindowResize();
  // 添加站内设置按钮
  // addSettingBtn();
  // 如果关闭了悬浮图标，在网站首页右上角添加插件设置入口
  // handleAddSettingText();
  // 加载更多按钮点击事件监听
  // handleAddLoadMoreBtnClick();
  // 手动吃肉：手动进入肉帖吃
  // handleAutoEat();
  // 增加回帖ubb
  handleAddReplyUBB();
  // 增加发帖ubb
  handleAddNewPostUBB();
  // 显示用户等级
  handleShowUserLevel();
  // 处理404页面跳回新帖页面
  handleNotFoundPage();
})();

// ==其他功能函数和方法==

function handleAddSettingText() {
  if (!isShowSettingIcon && $(".top2").length) {
    $(".top2").append(
      `<a class="yaohuo-setting-text" style="float:right;cursor: pointer;">插件设置</a>`
    );

    $(".yaohuo-setting-text").click(() => {
      setMenu();
    });
  }
}
function isMobile() {
  return /Mobile/i.test(navigator.userAgent);
}
function initSetting() {
  // 在移动设备上执行的代码
  if (isMobile()) {
    // 移动端默认显示站内设置图标
    settingData.isShowSettingIcon = true;
  } else {
    // 在桌面设备上执行的代码
  }

  // 获取用户历史数据
  yaohuo_userData = MY_getValue("yaohuo_userData");

  // 查看本地是否存在旧数据
  if (!yaohuo_userData) {
    yaohuo_userData = settingData;
    // MY_setValue("yaohuo_userData", yaohuo_userData);
  }

  // 自动更新数据
  for (let value in settingData) {
    if (!yaohuo_userData.hasOwnProperty(value)) {
      yaohuo_userData[value] = settingData[value];
      MY_setValue("yaohuo_userData", yaohuo_userData);
    }
  }

  initSettingBtnPosition("init");
}
// 更新按钮位置到最右边
/**
 * 当按钮靠最右边时，设置按钮的left偏移
 * @param {'init' | 'update'} type type值为init / update
 */
function initSettingBtnPosition(type = "update") {
  let { settingBtnTop, settingIconResponsiveSize, settingIconMaxSize } =
    yaohuo_userData;
  let newLeft;

  // btn最大100px，根据屏幕视口取18vw
  newLeft = Math.floor(
    window.innerWidth -
      Math.min(
        (window.innerWidth / 100) * settingIconResponsiveSize,
        settingIconMaxSize
      )
  );
  if (type === "update") {
    const floatingDiv = $("#floating-setting-btn")[0];
    floatingDiv.style.left = newLeft + "px";
  }
  saveSettingBtnPosition({ left: newLeft, top: settingBtnTop });
}
/**
 * 保存设置按钮的位置
 * @param {Object} pos - 按钮位置信息
 * @param {number} pos.left - 按钮左边距
 * @param {number} pos.top - 按钮上边距
 */
function saveSettingBtnPosition({ left, top }) {
  yaohuo_userData.settingBtnLeft = left;
  yaohuo_userData.settingBtnTop = top;

  setItem("yaohuo_userData", yaohuo_userData);
}

function addSettingBtn() {
  if ($("#floating-setting-btn").length) {
    return;
  }

  MY_addStyle(`
      #floating-setting-btn {
        display: ${isShowSettingIcon ? "block" : "none"};
        max-width: ${settingIconMaxSize}px;
        max-height: ${settingIconMaxSize}px;
        width: ${settingIconResponsiveSize}vw;
        height: ${settingIconResponsiveSize}vw;
        user-select: none;
        box-sizing: border-box;
        position: fixed;
        z-index: 999;
        cursor: move;
        background-repeat: no-repeat;
        background-position: center;
      }
      #floating-setting-btn svg {
        width: 100%;
        height: 100%;
        opacity: 0.6;
        filter: drop-shadow(0px 0px 3px #666);
      }
      .overflow-hidden-scroll {
        overflow: hidden !important;
      }
      .touch-action-none {
        touch-action: none;
      }
      .add-position-static{
        position: static !important;
      }
    `);

  let innerH = `
      <div id="floating-setting-btn" style="top: ${settingBtnTop}px;
        left: ${settingBtnLeft}px;">
        </svg>
        <svg
          t="1681624380345"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11281"
          width="80"
          height="80"
        >
          <path
            d="M761.472 978.944H253.696c-115.328 0-208.768-93.44-208.768-208.768V262.528C45.056 147.2 138.496 53.76 253.696 53.76h507.776C876.8 53.76 970.24 147.2 970.24 262.528v507.776c0 115.2-93.44 208.64-208.768 208.64z"
            fill="#89898F"
            p-id="11282"
          ></path>
          <path
            d="M602.368 513.408h-189.44C334.208 513.408 270.08 449.28 270.08 370.56S334.208 227.84 412.928 227.84h189.44c78.72 0 142.848 64.128 142.848 142.848s-64.128 142.72-142.848 142.72z m-189.44-262.272c-65.92 0-119.552 53.632-119.552 119.552s53.632 119.552 119.552 119.552h189.44c65.92 0 119.552-53.632 119.552-119.552s-53.632-119.552-119.552-119.552h-189.44zM611.072 804.864H404.224c-72.448 0-131.2-58.752-131.2-131.2s58.752-131.2 131.2-131.2h206.976c72.448 0 131.2 58.752 131.2 131.2-0.128 72.576-58.88 131.2-131.328 131.2z"
            fill="#FFFFFF"
            p-id="11283"
          ></path>
          <path
            d="M417.28 370.56m-80.128 0a80.128 80.128 0 1 0 160.256 0 80.128 80.128 0 1 0-160.256 0Z"
            fill="#FFFFFF"
            p-id="11284"
          ></path>
          <path
            d="M619.392 673.792m-80.128 0a80.128 80.128 0 1 0 160.256 0 80.128 80.128 0 1 0-160.256 0Z"
            fill="#89898F"
            p-id="11285"
          ></path>
        </svg>
      </div>
    `;
  $("body").append(innerH);

  const floatingDiv = $("#floating-setting-btn")[0];

  let mouseOffsetX = 0;
  let mouseOffsetY = 0;
  let isDragging = false;
  let dragThreshold = 5; // 拖动阈值，即鼠标移动的距离超过多少像素才开始拖动
  let clickThreshold = 500; // 点击阈值，即鼠标按下的时间不超过多少毫秒才算是点击

  let mouseDownTime; // 鼠标按下的时间
  let mouseDownX; // 鼠标按下的位置
  let mouseDownY;

  // 鼠标事件
  floatingDiv.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", throttle(onMouseMove, 15));
  document.addEventListener("mouseup", onMouseUp);

  // 触摸事件
  floatingDiv.addEventListener("touchstart", onTouchStart);
  document.addEventListener("touchmove", throttle(onTouchMove, 5));
  document.addEventListener("touchend", onTouchEnd);

  // 鼠标事件监听器
  function onMouseDown(e) {
    floatingDiv.style.transition = "unset";

    // 记录鼠标按下的时间和位置
    mouseDownTime = new Date().getTime();
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;

    // 鼠标相对于拖动图标的偏移x和y距离
    mouseOffsetX = e.clientX - floatingDiv.offsetLeft;
    mouseOffsetY = e.clientY - floatingDiv.offsetTop;
    isDragging = true;

    e.preventDefault();
    e.stopPropagation();
  }

  function onMouseMove(e) {
    if (!isDragging) {
      return;
    }

    const left = e.clientX - mouseOffsetX;
    const top = e.clientY - mouseOffsetY;

    const maxLeft = window.innerWidth - floatingDiv.offsetWidth;
    const maxTop = window.innerHeight - floatingDiv.offsetHeight;

    floatingDiv.style.left = Math.min(Math.max(0, left), maxLeft) + "px";
    floatingDiv.style.top = Math.min(Math.max(0, top), maxTop) + "px";
  }

  function onMouseUp(e) {
    if (!isDragging) {
      return;
    }

    // 拖动结束重置数据
    mouseOffsetX = 0;
    mouseOffsetY = 0;
    isDragging = false;

    // 如果按下的时间不够长，则认为是点击事件
    // 如果移动的距离

    let distanceX = Math.abs(e.clientX - mouseDownX);
    let distanceY = Math.abs(e.clientY - mouseDownY);
    // 计算鼠标点击的时间小于500ms，并且移动的距离少于5像素则认为时点击事件
    if (
      new Date().getTime() - mouseDownTime < clickThreshold &&
      distanceX < dragThreshold &&
      distanceY < dragThreshold
    ) {
      setMenu();
      return;
    }

    // 拖动按钮自动靠边处理
    let newLeft;
    let position = floatingDiv.getBoundingClientRect();
    // 如果左边比右边多就靠左，否则靠右
    if (window.innerWidth - position.right > position.left) {
      newLeft = 0;
    } else {
      newLeft = window.innerWidth - position.width;
    }

    floatingDiv.style.left = newLeft + "px";
    floatingDiv.style.transition = "all 0.2s ease-in-out";

    // 更新悬浮图标位置信息
    saveSettingBtnPosition({ top: position.top, left: newLeft });
  }

  // 触摸事件监听器
  function onTouchStart(e) {
    floatingDiv.style.transition = "unset";

    // 记录鼠标按下的时间和位置
    mouseDownTime = new Date().getTime();

    mouseDownX = e.touches[0].clientX;
    mouseDownY = e.touches[0].clientY;

    mouseOffsetX = e.touches[0].clientX - floatingDiv.offsetLeft;
    mouseOffsetY = e.touches[0].clientY - floatingDiv.offsetTop;
    isDragging = true;

    e.preventDefault();
    e.stopPropagation();

    $("body").addClass("touch-action-none");
    $("body").addClass("overflow-hidden-scroll");
  }

  function onTouchMove(e) {
    if (!isDragging) {
      return;
    }

    const left = e.touches[0].clientX - mouseOffsetX;
    const top = e.touches[0].clientY - mouseOffsetY;

    const maxLeft = window.innerWidth - floatingDiv.offsetWidth;
    const maxTop = window.innerHeight - floatingDiv.offsetHeight;

    floatingDiv.style.left = Math.min(Math.max(0, left), maxLeft) + "px";
    floatingDiv.style.top = Math.min(Math.max(0, top), maxTop) + "px";
  }

  function onTouchEnd(e) {
    if (!isDragging) {
      return;
    }
    $("body").removeClass("touch-action-none");
    $("body").removeClass("overflow-hidden-scroll");

    // 拖动结束重置数据
    mouseOffsetX = 0;
    mouseOffsetY = 0;
    isDragging = false;

    // 如果按下的时间不够长，则认为是点击事件
    // 如果移动的距离
    let touch = e.changedTouches[0];
    let clientX = touch.clientX;
    let clientY = touch.clientY;

    let distanceX = Math.abs(clientX - mouseDownX);
    let distanceY = Math.abs(clientY - mouseDownY);

    // 计算鼠标点击的时间小于500ms，并且移动的距离少于5像素则认为时点击事件
    if (
      new Date().getTime() - mouseDownTime < clickThreshold &&
      distanceX < dragThreshold &&
      distanceY < dragThreshold
    ) {
      setMenu();
      return;
    }

    // 拖动按钮自动靠边处理
    let newLeft;
    let position = floatingDiv.getBoundingClientRect();
    // 如果左边比右边多就靠左，否则靠右
    if (window.innerWidth - position.right > position.left) {
      newLeft = 0;
    } else {
      newLeft = window.innerWidth - position.width;
    }
    floatingDiv.style.left = newLeft + "px";
    floatingDiv.style.transition = "all 0.2s ease-in-out";

    // 更新悬浮图标位置信息
    saveSettingBtnPosition({ top: position.top, left: newLeft });
  }
}
// 处理窗口改变事件
function handleWindowResize() {
  // 窗口改变重新计算悬浮按钮的位置
  window.addEventListener("resize", function (e) {
    let { settingBtnLeft } = yaohuo_userData;

    if (settingBtnLeft !== 0) {
      initSettingBtnPosition("update");
    }
  });
}
function setMenu() {
  // 避免重复添加
  if ($(".yaohuo-modal-mask").length) {
    return;
  }
  MY_addStyle(`
      .yaohuo-modal-mask {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.45);
      }
      .yaohuo-wrap {
        padding: 20px 0;
        box-sizing: border-box;
        position: relative;
        margin: 0 auto;
        background: #fff;
        border-radius: 12px;
        top: 10%;
        width: 400px;
        max-width: 95vw;
        user-select: none;
      }
      .yaohuo-wrap header {
        padding: 0 20px;
        color: rgba(0, 0, 0, 0.88);
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 8px;
      }
      .yaohuo-wrap footer {
        font-size: 0px;
        text-align: right;
        margin-top: 10px;
        padding: 0 20px;
      }
      .yaohuo-wrap footer button {
        font-size: 14px;
        height: 32px;
        padding: 4px 15px;
        border-radius: 6px;
        border: 1px solid transparent;
        cursor: pointer;
      }
      .yaohuo-wrap footer .cancel-btn {
        background-color: #fff;
        border-color: #d9d9d9;
        margin-right: 8px;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
      }
      .yaohuo-wrap footer .ok-btn {
        color: #fff;
        background-color: #1677ff;
        box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
      }
      .yaohuo-wrap ul {
        margin: 0;
        padding: 0 10px 0 20px;
        margin-right: 7px;
        max-height: 65vh;
        overflow: auto;
      }
      /* 设置滚动条的宽度和高度 */
      .yaohuo-wrap ::-webkit-scrollbar {
        width: 3px;
      }

      /* 设置滚动条滑块的背景色 */
      .yaohuo-wrap ::-webkit-scrollbar-thumb {
        background-color: #999;
        border-radius:10px;
      }
      .yaohuo-wrap i {
        font-style: normal;
      }
      .yaohuo-wrap li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44px;
      }
      .yaohuo-wrap li input[type="range"] {
        width: 130px;
        height: 1px;
        appearance: auto;
        border: none;
        padding: 0;
      }
      .yaohuo-wrap li select {
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        width: 130px;
        border: 1px solid #5c5c5c;
        border-radius: 5px;
        text-align: center;
        outline: 0;
      }

      .yaohuo-wrap .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 30px;
      }

      .yaohuo-wrap .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .yaohuo-wrap .switch label {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 34px;
      }

      .yaohuo-wrap .switch label::before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 6px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }

      .yaohuo-wrap .switch input:checked + label {
        background-color: #2196f3;
      }

      .yaohuo-wrap .switch input:checked + label::before {
        transform: translateX(26px);
      }
    `);
  let innerH = `
      <div class="yaohuo-modal-mask">
        <div class="yaohuo-wrap">
          <header>🔥拓展增强🔥妖火插件设置</header>
          <ul>
            <li>
              <span>显示站内设置按钮</span>
              <div class="switch">
                <input type="checkbox" id="isShowSettingIcon" data-key="isShowSettingIcon" />
                <label for="isShowSettingIcon"></label>
              </div>
            </li>
            <li>
              <span>手动进贴吃肉</span>
              <div class="switch">
                <input type="checkbox" id="isAutoEat" data-key="isAutoEat" />
                <label for="isAutoEat"></label>
              </div>
            </li>
            <li>
              <span>肉帖过期时间：<i class="range-num">${expiredDays}</i>天</span>
              <input
                type="range"
                id="expiredDays"
                data-key="expiredDays"
                min="${1}"
                value="${expiredDays}"
                max="${7}"
                step="${1}"
              />
            </li>
            <li>
              <span>回帖表情默认展开</span>
              <div class="switch">
                <input type="checkbox" id="isUnfoldFace" data-key="isUnfoldFace" />
                <label for="isUnfoldFace"></label>
              </div>
            </li>
            <li>
              <span>回帖UBB默认展开</span>
              <div class="switch">
                <input type="checkbox" id="isUnfoldUbb" data-key="isUnfoldUbb" />
                <label for="isUnfoldUbb"></label>
              </div>
            </li>
            <li>
              <span>自动加载下一页</span>
              <div class="switch">
                <input type="checkbox" id="isLoadNextPage" data-key="isLoadNextPage" />
                <label for="isLoadNextPage"></label>
              </div>
            </li>
            <li>
              <span>自动加载下一页方式</span>
              <select data-key="loadNextPageType" id="loadNextPageType">
                <option value="more">加载更多按钮</option>
                <option value="nextPage">下一页按钮</option>
              </select>
            </li>
            <li>
              <span>自动加载最大数：<i class="range-num">${getValue(
                "maxLoadNum",
                40
              )}</i>个</span>
              <input
                id="maxLoadNum"
                type="range"
                data-key="maxLoadNum"
                min="${minNumRange}"
                value="${maxLoadNum}"
                max="${maxNumRange}"
                step="${numStep}"
              />
            </li>
            <li>
              <span>贴子显示等级</span>
              <div class="switch">
                <input type="checkbox" id="isShowLevel" data-key="isShowLevel" />
                <label for="isShowLevel"></label>
              </div>
            </li>
            <li>
              <span>发帖增强</span>
              <div class="switch">
                <input type="checkbox" id="isAddNewPostUBB" data-key="isAddNewPostUBB" />
                <label for="isAddNewPostUBB"></label>
              </div>
            </li>
            <li>
              <span>回帖增强</span>
              <div class="switch">
                <input type="checkbox" id="isAddReplyUBB" data-key="isAddReplyUBB" />
                <label for="isAddReplyUBB"></label>
              </div>
            </li>
          </ul>
          <footer>
            <button class="cancel-btn">取消</button>
            <button class="ok-btn">确认</button>
          </footer>
        </div>
      </div>
    `;
  $("body").append(innerH).addClass("overflow-hidden-scroll");

  $(".yaohuo-modal-mask").show();

  setSettingInputEvent("edit");

  $(".cancel-btn").click(handleCancelBtn);
  $(".ok-btn").click(handleOkBtn);
}
/**
 * 设置设置菜单，点击设置打开菜单，并且回显数据，保存则保存数据
 * @param {"edit" | 'save'} status edit和save两种模式
 */
function setSettingInputEvent(status = "edit") {
  $(".yaohuo-wrap input, .yaohuo-wrap select").each((index, item) => {
    let type = item.type;
    let dataKey = item.getAttribute("data-key");
    switch (type) {
      case "checkbox":
        if (status === "edit") {
          item.checked = getValue(dataKey) ? true : false;
          // 根据当前的按钮选中状态处理子项的联动显示或隐藏
          autoShowElement({
            fatherIdAry: ["isLoadNextPage"],
            childId: ["loadNextPageType"],
            dataKey,
          });
          autoShowElement({
            fatherIdAry: ["isLoadNextPage"],
            childId: ["maxLoadNum"],
            dataKey,
          });
          autoShowElement({
            fatherIdAry: ["isAutoEat"],
            childId: ["expiredDays"],
            dataKey,
          });
        } else {
          setValue(dataKey, item.checked);
        }
        break;

      case "range":
        if (status === "edit") {
          $(item).on("input propertychange", function (event) {
            $(item).prev().children(".range-num").text(item.value);
          });
        } else {
          setValue(dataKey, parseInt(item.value));
        }
        break;

      case "select-one":
        if (status === "edit") {
          item.value = getValue(dataKey);
          $(item).on("change", function (event) {
            $(item).prev().children(".range-num").text(item.value);
          });
        } else {
          setValue(dataKey, item.value);
        }
        break;

      case "number":
        if (status === "edit") {
          item.value = getValue(dataKey);
        } else {
          setValue(dataKey, item.value);
        }
        break;

      default:
        if (status === "edit") {
          item.value = getValue(dataKey);
        } else {
          setValue(dataKey, item.value);
        }
        break;
    }
  });

  /**
   * 根据当前的选中状态处理子项的显示或隐藏
   * @param {Object} options - 选项对象
   * @param {Array<string>} options.fatherIdAry - 包含父元素ID的字符串数组
   * @param {Array<string>} options.childId - 子元素的ID
   * @param {string} options.dataKey - 存储在父元素上的数据键名
   */
  function autoShowElement({ fatherIdAry, childId, dataKey }) {
    execFn();
    fatherIdAry.forEach((item) => {
      $(`#${item}`).on("change", function (event) {
        execFn();
      });
    });
    function execFn() {
      if (fatherIdAry.includes(dataKey)) {
        let parent = $(`#${childId}`).parent();
        parent = parent.prop("tagName") === "LI" ? parent : parent.parent();

        let isShow = fatherIdAry.some((item) => $(`#${item}`).prop("checked"));
        isShow ? parent.show() : parent.hide();
      }
    }
  }
}
function handleCancelBtn() {
  $("body").removeClass("overflow-hidden-scroll");
  $(".yaohuo-modal-mask").remove();
}
function handleOkBtn() {
  setSettingInputEvent("save");
  $("body").removeClass("overflow-hidden-scroll");
  $(".yaohuo-modal-mask").hide();
  MY_setValue("yaohuo_userData", yaohuo_userData);
  if (!yaohuo_userData.isShowSettingIcon) {
    $("#floating-setting-btn").hide();
  } else {
    $("#floating-setting-btn").show();
  }
  // 刷新页面
  setTimeout(function () {
    window.location.reload();
  }, 300);
}

// 浏览器scroll事件
function handleWindowScroll() {
  window.addEventListener(
    "scroll",
    throttle(() => {
      let isPage = loadNextPage.some((item) =>
        item.test(window.location.pathname)
      );

      // 处理点击加载更多后的全自动吃肉
      if (isPage) {
        let nextBtn = null;
        // 下一页按钮的父节点
        let nextPageWrap = document.querySelector(".bt2");

        if (loadNextPageType === "more" || !nextPageWrap) {
          // 加载更多加载下一页
          nextBtn = document.querySelector("span[id$=show_tip]");

          // 已经请求到数据
          if (nextBtn?.innerText.includes("加载更多")) {
            // 加载完成了

            isClickLoadMoreBtn = false;
            isNewPage = false;

            // 处理自动加载更多，需要放到最后
            handleLoadNextPage();
          }
        } else {
          // 下一页按钮加载下一页

          nextBtn = nextPageWrap.firstChild;

          handleLoadNextPage();
        }
      }
    }, 100)
  );
}
// 返回当前列表数据的长度
function getListLength() {
  let length = 0;
  if ($(".listdata").length) {
    length = $(".listdata").length;
  } else {
    length = $(".reline").length + $(".list-reply").length;
  }
  return length;
}
// 自动吃肉：手动进入肉帖自动吃
function handleAutoEat() {
  if (/^\/bbs-.*\.html$/.test(window.location.pathname)) {
    const form = document.getElementsByName("f")[0];
    if (!form) {
      let isAutoEatBbs = window.location.search.includes("open=new");
      // 如果是自动吃肉的则直接返回，并记录不可吃肉
      if (isAutoEatBbs) {
        autoEatCallback();
      }
      return;
    }
    const face = form.getElementsByTagName("select")[0];
    const replyBtn = document.getElementsByName("g")[0];

    const textarea = document.querySelector(".retextarea");
    // 帖子标识id
    let id = window.location.pathname.match(/\d+/)[0];

    // 吃肉 必须放在后面
    const fileTag = document.querySelector(
      "a[href^='/bbs/book_re_addfile.aspx']"
    );
    let eatMeat = document.createElement("input");
    eatMeat.style.float = "right";
    eatMeat.type = "submit";
    eatMeat.value = "一键吃肉";
    eatMeat.addEventListener("click", (e) => {
      e.preventDefault();
      let eatWordsArr = [
        "吃",
        "吃吃",
        "吃吃.",
        "吃吃。",
        "吃吃..",
        "吃吃。。",
        "吃了",
        "吃肉",
        "来吃肉",
        "吃.",
        "吃。",
        "吃了.",
        "吃了。",
        "吃肉.",
        "吃肉。",
        "来吃肉.",
        "来吃肉。",
        "吃..",
        "吃。。",
        "吃了..",
        "吃了。。",
        "吃肉..",
        "吃肉。。",
        "来吃肉..",
        "来吃肉。。",
        "口乞了",
        "口乞了.",
        "口乞了。",
        "口乞肉",
        "口乞肉.",
        "口乞肉。",
        "口乞..",
        "口乞。。",
        "chile..",
        "chile。。",
        "7肉..",
        "7肉。。",
        "7了..",
        "7了。。",
        "肉肉肉",
        "肉肉肉.",
        "肉肉肉。",
        "肉肉肉..",
        "肉肉肉。。",
        "先吃肉",
        "先吃肉.",
        "先吃肉。",
        "先吃肉..",
        "先吃肉。。",
      ];

      let index = Math.floor(Math.random() * eatWordsArr.length);
      console.log("吃肉回复：", eatWordsArr[index]);
      insertText(textarea, eatWordsArr[index], 0);
      replyBtn.click();
    });

    // 添加事件监听，如果吃过肉则会提示
    document.getElementsByName("g")[0].addEventListener(
      "click",
      (e) => {
        if (autoEatList[id] && !confirm("当前已经吃过肉，是否继续回复")) {
          // 取消提交
          textarea.value = "";
          e.preventDefault();
        }
      },
      true
    );

    const meatTag = document.querySelector("span.yushuzi");

    if (!isAutoEat) {
      console.log("未开启自动吃肉，可在编辑脚本进行开启");
    } else {
      if (meatTag == undefined) {
        console.log("非肉勿7");
        // autoEatCallback();
      } else if (parseInt(meatTag.innerHTML) <= 0) {
        console.log("无肉怎7");
        // 把无肉帖添加进去
        autoEatCallback();
      } else {
        let autoEatList = getItem("autoEatList");

        if (!autoEatList[id]) {
          console.log("有肉快7");
          eatMeat.click();
        } else {
          console.log("已经吃过了");
        }

        autoEatCallback();
      }
    }
    // 将吃肉插入到文件回帖后面
    fileTag.after(eatMeat);
  }
}
function insertText(obj, str, offset) {
  if (document.selection) {
    let sel = document.selection.createRange();
    sel.text = str;
  } else if (
    typeof obj.selectionStart === "number" &&
    typeof obj.selectionEnd === "number"
  ) {
    let startPos = obj.selectionStart,
      endPos = obj.selectionEnd,
      cursorPos = startPos,
      tmpStr = obj.value;
    obj.value =
      tmpStr.substring(0, startPos) +
      str +
      tmpStr.substring(endPos, tmpStr.length);
    cursorPos += str.length;
    obj.selectionStart = obj.selectionEnd = cursorPos - offset;
  } else {
    obj.value += str;
  }
  obj.focus();
}
// 吃完肉的回调
function autoEatCallback() {
  let id = window.location.pathname.match(/\d+/)[0];
  let isAutoEatBbs = window.location.search.includes("open=new");
  // let autoEatList = getItem("autoEatList");

  autoEatList[id] = new Date().getTime();

  setItem("autoEatList", autoEatList);
}
/**
 * 返回指定天数后的一天开始的时间，例如1天，则为明天00:00:00，2天则为后天00:00:00
 * 肉帖1天有效期则代表明天00:00:00过期，2天有效期则是后天00:00:00
 * @param {number} time 传入一个时间戳
 * @param {number} days 传入过期的天数
 * @returns {number} 返回到期时间的时间戳
 */

function timeLeft(time, days = 1) {
  const target = new Date(time + (days - 1) * 24 * 60 * 60 * 1000);
  target.setHours(24, 00, 00, 000);
  return target.getTime();
}
// 获取值
function getItem(key, defaultValue = {}) {
  if (key === "autoEatList") {
    let autoEatList = MY_getValue(key, {});
    // 删除过期的肉帖
    deleteExpiredID(autoEatList);
    // 更新肉帖数据
    setItem(key, autoEatList);
    return autoEatList;
  }
  return MY_getValue(key, {});
}
function MY_addStyle(innerHTML) {
  // 创建 style 元素
  var style = document.createElement("style");
  style.type = "text/css";

  // 设置样式内容
  var css = innerHTML;
  style.innerHTML = css;

  // 将 style 元素添加到 head 元素中
  document.head.appendChild(style);
}
function MY_setValue(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}
function MY_getValue(key, defaultValue = {}) {
  const value = localStorage.getItem(key) || defaultValue;
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}
// 设置值
function setItem(key, value) {
  // if (key === "autoEatList") {
  //   deleteExpiredID(value); //删除过期的肉帖
  // }
  MY_setValue(key, value);
}
/**
 * 返回yaohuo_userData里的数据
 * @param {string} key 要获取值的属性
 * @param {any} value 获取的值
 * @returns {any}
 */
function getValue(key, value) {
  let setting = yaohuo_userData;
  return setting[key] || value;
}
/**
 * 更新yaohuo_userData里的数据
 * @param {string} key 要设置值的属性
 * @param {any} value 设置的值
 * @returns {any}
 */
function setValue(key, value) {
  yaohuo_userData[key] = value;
  // setItem("yaohuo_userData", yaohuo_userData);
}
// 增加发帖ubb
function handleAddNewPostUBB() {
  if (postPage.includes(window.location.pathname) && isAddNewPostUBB) {
    let bookContent = document.getElementsByName("book_content")[0];
    bookContent.insertAdjacentHTML(
      "beforebegin",
      `<div class='btBox'>
            <div class='bt2'>
                <a style='width:25%' id='ubb_url'>超链接</a>
                <a style='width:25%' id='ubb_img'>图片</a>
                <a style='width:25%' id='ubb_movie'>视频</a>
                <a style='width:25%' id='ubb_more'">更多...</a>
            </div>
        </div>
        <div class='more_ubb_tools' style='display: none'>
          <div class='btBox'>
            <div class='bt2'>
                <a style='width:25%' id='ubb_color'>颜色</a>
                <a style='width:25%' id='ubb_b'">加粗</a>
                <a style='width:25%' id='ubb_strike'>删除</a>
                <a style='width:25%' id='ubb_font'>字体</a>
            </div>
          </div>
          <div class='btBox'>
            <div class='bt2'>
              <a style='width:25%' id='ubb_u'>下划线</a>
              <a style='width:25%' id='ubb_i'>斜体</a>
              <a style='width:25%' id='ubb_hr'>分割线</a>
              <a style='width:25%' href='https://www.yaohuo.me/bbs/book_view_ubb.aspx?action=class&siteid=1000&classid=177&page=1&backurl=bbs%2fbook_view_add.aspx%3fsiteid%3d1000%26classid%3d177' target="_blank">UBB使用</a>
            </div>
          </div>
          <div class='btBox'>
            <div class='bt2'>
              <a style='width:25%' id='ubb_audio'>音频</a>
              <a style='width:25%' id='ubb_left'>居左</a>
              <a style='width:25%' id='ubb_center'>居中</a>
              <a style='width:25%' id='ubb_right'>居右</a>
            </div>
          </div>
          <div class='btBox'>
              <div class='bt2'>
                  <a style='width:25%' href='https://yaohuo.me/tuchuang/' target="_blank">妖火图床</a>
                  <a style='width:25%' href='https://img.ink/' target="_blank">水墨图床</a>
                  <a style='width:25%' href='https://aapi.eu.org/dy' target="_blank">抖音解析</a>
                  <a style='width:25%' href='https://aapi.eu.org/ks' target="_blank">快手解析</a>
              </div>
          </div>
          <div class='btBox'>
            <div class='bt2'>
              <a style='width:25%' href='https://aapi.eu.org/ppx' target="_blank">皮皮虾解析</a>
              <a style='width:25%' href='https://aapi.eu.org/bili' target="_blank">b站解析</a>
              <a style='width:25%' href='https://pan.whgpc.com/upload.php' target="_blank">外链网盘</a>
              <a style='width:25%' href='https://urlify.cn/' target="_blank">短链生成</a>
            </div>
          </div>
        </div>`
    );

    addEventAry.forEach((item) => {
      handleEventListener(item.id, bookContent, item.ubb, item.offset);
    });
    document.getElementById("ubb_more").addEventListener("click", () => {
      let ubb_tool = document.getElementsByClassName("more_ubb_tools")[0];
      ubb_tool.style.display =
        ubb_tool.style.display === "none" ? "block" : "none";
    });
  }
}
// 增加回帖ubb
function handleAddReplyUBB() {
  if (
    (/^\/bbs-.*\.html$/.test(window.location.pathname) ||
      viewPage.includes(window.location.pathname)) &&
    isAddReplyUBB
  ) {
    const form = document.getElementsByName("f")[0];
    if (!form) {
      return;
    }
    const face = form.getElementsByTagName("select")[0];
    const sendmsg = form.getElementsByTagName("select")[1];
    const content = form.getElementsByTagName("textarea")[0];
    const replyBtn = document.getElementsByName("g")[0];
    const fileTag = document.querySelector(
      "a[href^='/bbs/book_re_addfile.aspx']"
    );
    // 显示表情
    content.insertAdjacentHTML("beforebegin", '<div id="facearea"></div>');
    const facearea = document.getElementById("facearea");

    let allFaceHtml = "";

    faceList.forEach((faceStr, i) => {
      let name = faceStr.split(".")[0];
      allFaceHtml += `
        <img
          id="setFace${i}"
          style="width: 32px;height: 32px"
          src="face/${faceStr}"
          value="${name}.gif"
        />`;
    });
    diyFaceList.forEach((item, i) => {
      allFaceHtml += `
        <img
          id="diyFace${i}"
          data-src="${item.url}"
          style="width: 32px;height: 32px"
          src="${item.url}"
          value="${item.name}.gif"
        />`;
    });
    facearea.innerHTML = allFaceHtml;

    // 添加表情展开按钮
    sendmsg.insertAdjacentHTML(
      "afterend",
      `<span 
          style="${a3style}display:${
        isUnfoldFace ? "display: block" : "display: none"
      }" id="unfold"
          >表情${isUnfoldFace ? "折叠" : "展开"}</span>`
    );

    fileTag.insertAdjacentHTML(
      "afterend",
      `<input id="ubb_unfold" type="submit" value="${
        isUnfoldUbb ? "折叠UBB" : "展开UBB"
      }" style="float:right"/>`
    );

    // 处理点击添加表情包
    facearea.onclick = function (event) {
      if (event.target.tagName.toLowerCase() === "img") {
        // 自定义图片
        let diySrc = event.target.dataset.src;

        if (diySrc) {
          //把光标移到文本框最前面
          textarea.focus();
          textarea.setSelectionRange(0, 0);
          insertText(textarea, `[img]${diySrc}[/img]`, 0);
          return;
        }
        // 处理图片的点击事件
        face.value = event.target.getAttribute("value");
      }
    };

    // 妖火图床、超链接、图片
    form.insertAdjacentHTML(
      "beforeend",
      `
        <hr>
        <div class="ubb_wrap" style="text-align: center;overflow: hidden;">
          <span id='ubb_url' style="${spanstyle}">链接</span>
          <span id='ubb_img' style="${spanstyle}">图片</span>
          <span id='ubb_audio' style="${spanstyle}">音频</span>
          <span id='ubb_movie' style="${spanstyle}">视频</span>
          <span id='ubb_nzgsa' style="${a2style}">你真该死啊</span>

          <br>
          <span id='ubb_text' style="${spanstyle}">半角</span>
          <span id='ubb_br' style="${spanstyle}">换行</span>
          <span id='ubb_b' style="${spanstyle}">加粗</span>
          <span id='ubb_i' style="${spanstyle}">斜体</span>

          <span id='ubb_color' style="${spanstyle}">颜色字</span>
          <span id='ubb_u' style="${spanstyle}">下划线</span>
          <span id='ubb_strike' style="${spanstyle}">删除线</span>
          <span id='ubb_hr' style="${spanstyle}">分割线</span>
          <br>
          <span id='ubb_sms' style="${spanstyle}">短信</span>
          <span id='ubb_call' style="${spanstyle}">拨号</span>
          <span id='ubb_now' style="${spanstyle}">时间</span>
          <span id='ubb_codo' style="${spanstyle}">倒计天</span>
          <br>
          <a href='https://yaohuo.me/tuchuang/' target="_blank" style="${spanstyle}">图床</a>
          <a href='https://aapi.eu.org/ppx' target="_blank" style="${spanstyle}">皮皮</a>
          <a href='https://aapi.eu.org/bili' target="_blank" style="${spanstyle}">b站</a>
          <a href='https://aapi.eu.org/dy' target="_blank" style="${spanstyle}">抖音</a>
          <a href='https://aapi.eu.org/ks' target="_blank" style="${spanstyle}">快手</a>
          <a href='https://pan.whgpc.com/upload.php' target="_blank" style="${spanstyle}">外链</a>
          <a href='https://urlify.cn/' target="_blank" style="${spanstyle}">短链接</a>
        </div>
        <hr>
        `
    );
    // 处理默认展开ubb和表情
    if (isUnfoldFace) {
      facearea.style.display = "block";
    } else {
      facearea.style.display = "none";
    }
    let ubbWrap = document.querySelector(".ubb_wrap");
    if (isUnfoldUbb) {
      ubbWrap.style.height = "auto";
    } else {
      ubbWrap.style.height = "32px";
    }
    // 处理折叠表情
    document.querySelector("#unfold").onclick = function (event) {
      if (this.innerText == "表情展开") {
        facearea.style.display = "block";
        this.innerText = "表情折叠";
      } else {
        facearea.style.display = "none";
        this.innerText = "表情展开";
      }
    };

    // 处理折叠ubb
    document.querySelector("#ubb_unfold").onclick = function (event) {
      if (this.value == "折叠UBB") {
        ubbWrap.style.height = "32px";
        this.value = "展开UBB";
      } else {
        ubbWrap.style.height = "auto";
        this.value = "折叠UBB";
      }
      event.preventDefault();
    };
    // 不让整个form粘性定位。

    document.querySelector(".sticky").classList.add("add-position-static");
    // 超链接
    const textarea = document.querySelector("form > .retextarea");
    addEventAry.forEach((item) => {
      handleEventListener(item.id, textarea, item.ubb, item.offset);
    });
  }
}
// 处理404页面跳回新帖页面
function handleNotFoundPage() {
  if (notFoundPage.includes(window.location.pathname)) {
    let year = new Date().getFullYear();
    location.href = `/bbs/book_list.aspx?gettotal=${year}&action=new`;
  }
}
/**
 * 删除过期的帖子
 * @param {number|string} value 存储肉帖的对象
 */
function deleteExpiredID(value) {
  let nowTime = new Date().getTime();

  Object.keys(value).forEach((key) => {
    let lastTime = value[key];
    if (nowTime > timeLeft(lastTime, expiredDays)) {
      delete value[key];
    }
  });
}
// 获取用户等级
function handleShowUserLevel() {
  if (!/^\/bbs-.*\.html$/.test(window.location.pathname) || !isShowLevel) {
    return;
  }

  let user_id =
    document.getElementsByClassName("subtitle")[0].firstElementChild.href;

  function success(rp) {
    let lv_zz = /<b>等级:<\/b>(\S*)级/;
    let lv_text = rp.match(lv_zz)[1];
    // console.log(lv_text);
    addLvTip(lv_text);
  }

  function fail(code) {
    console.log("error");
  }

  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        return success(request.responseText);
      } else {
        return fail(request.status);
      }
    } else {
    }
  };
  request.open("GET", user_id);
  //request.responseType = 'document';
  request.send();

  function addLvTip(lv) {
    let info_d = document.getElementsByClassName("subtitle")[0];
    let user_name_d = info_d.children[1];
    console.log(user_name_d);

    let lv_d = document.createElement("div");
    lv_d.innerText = "Lv " + lv;
    lv_d.style =
      "display:inline;margin-left:10px; text-align:center; margin-right:10px;color:#ff4234;font-size:17px;border-radius: 30px;";
    info_d.insertBefore(lv_d, user_name_d);
  }
}
function handleAddLoadMoreBtnClick() {
  // 如果打开了全自动吃肉和自动加载更多，并且在帖子列表页才添加事件
  let isPage = loadNextPage.some((item) => item.test(window.location.pathname));
  if (isPage) {
    let loadMoreBtn = null;
    let nextPageWrap = document.querySelector(".bt2");
    if (loadNextPageType === "nextPage" && nextPageWrap) {
      loadMoreBtn = nextPageWrap.firstChild;
    } else {
      loadMoreBtn = document.querySelector("#KL_loadmore");
    }
    loadMoreBtn?.addEventListener("click", (e) => {
      isClickLoadMoreBtn = true;
      isNewPage = false;
    });
  }
}
// 自动加载下一页
function handleLoadNextPage() {
  // 处理自动加载更多
  let isPage = loadNextPage.some((item) => item.test(window.location.pathname));
  if (isPage && isLoadNextPage) {
    let nextBtn = null;
    let nextPageWrap = document.querySelector(".bt2");
    // 距离按钮最大多少就会触发
    let bottomMaxDistance = 250;
    if (loadNextPageType === "more" || !nextPageWrap) {
      nextBtn = document.querySelector("span[id$=show_tip]");
    } else {
      nextBtn = nextPageWrap.firstChild;
      bottomMaxDistance = 150;
    }
    let A = nextBtn.getBoundingClientRect().bottom;
    let B = document.documentElement.clientHeight;
    // 获取当前列表的长度
    let newLength = getListLength();

    // 加载更多按钮距离距底部小于300px才开始加载
    // 没有加载完成前不会再次加载
    // 小于页面最大加载数量才会加载
    if (
      A <= B + bottomMaxDistance &&
      !isClickLoadMoreBtn &&
      newLength < maxLoadNum
    ) {
      nextBtn.click();
      // 放到加载更多按钮里面监听，此处不处理
      // isClickLoadMoreBtn = true;
      // isNewPage = false;
    }
  }
}
/**
 * 节流函数
 * @param {function} fn - 要节流的函数
 * @param {number} interval - 节流时间间隔（毫秒）
 * @param {Object} options - 选项对象
 * @param {boolean} [options.leading=true] - 是否在开始时立即执行一次函数
 * @param {boolean} [options.trailing=isExecTrail] - 是否在结束时再执行一次函数
 * @returns {function} 节流后的函数
 */
function throttle(
  fn,
  interval,
  { leading = true, trailing = isExecTrail } = {}
) {
  let startTime = 0;
  let timer = null;

  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      try {
        // 1.获取当前时间
        const nowTime = new Date().getTime();

        // 对立即执行进行控制
        if (!leading && startTime === 0) {
          startTime = nowTime;
        }

        // 2.计算需要等待的时间执行函数
        const waitTime = interval - (nowTime - startTime);
        if (waitTime <= 0) {
          // console.log("执行操作fn")
          if (timer) clearTimeout(timer);
          const res = fn.apply(this, args);
          resolve(res);
          startTime = nowTime;
          timer = null;
          return;
        }

        // 3.判断是否需要执行尾部
        if (trailing && !timer) {
          timer = setTimeout(() => {
            // console.log("执行timer")
            const res = fn.apply(this, args);
            resolve(res);
            startTime = new Date().getTime();
            timer = null;
          }, waitTime);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer);
    startTime = 0;
    timer = null;
  };

  return _throttle;
}
/**
 * 添加事件监听
 * @param {string} id dom元素id
 * @param {HTMLElement} textarea 插入的文本框
 * @param {string} ubb 插入的内容
 * @param {number} offset 插入的位置
 */
function handleEventListener(id, textarea, ubb, offset) {
  document.getElementById(id)?.addEventListener("click", (e) => {
    if (id === "ubb_nzgsa") {
      if (textarea.value !== "") {
        insertText(
          textarea,
          "[audio=X]https://file.uhsea.com/2304/3deb45e90564252bf281f47c7b47a153KJ.mp3[/audio]",
          0
        );
      } else {
        alert("不要无意义灌水啦！");
      }
    } else {
      e.preventDefault();
      insertText(textarea, ubb, offset);
    }
  });
}
