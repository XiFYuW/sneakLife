export const fileInput = {
  option: {
    language: 'zh',
    browseOnZoneClick: true,
    dropZoneTitle: '可以将文件拖放到这里 …支持多文件上传',
    uploadUrl: '',
    // 是否显示上传按钮
    showUpload: true,
    // 显示移除按钮
    showRemove: true,
    // 是否显示预览
    showPreview: true,
    // 是否显示拖拽区域
    dropZoneEnabled: true,
    // 是否显示文件标题
    showCaption: false,
    // 允许的最大文件数
    maxFileCount: 12,
    // 允许的最小文件数
    minFileCount: 1
  },
  init: function ($, el, option) {
    $('#' + el).fileinput(option)
  }
}
