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
  init: function (obj, option) {
    obj.fileinput(option)
  },
  /**
   * 单个先触发
   * @param obj 元素对象
   */
  filePreUpload: function (obj) {
    obj.on('filepreupload', function (event, data, previewId, index) {
      debugger
    })
  },
  /**
   * 单个上传成功之后
   * @param obj 元素对象
   */
  fileUploaded: function (obj) {
    obj.on('fileuploaded', function (event, data, previewId, index) {
      debugger
    })
  },
  /**
   * 批处理先触发,之后触发filePreUpload
   * @param obj 元素对象
   */
  fileBatchPreUpload: function (obj) {
    obj.on('filebatchpreupload', function (event, data) {
      debugger
    })
  },
  /**
   * 批量成功之后
   * @param obj 元素对象
   */
  fileBatchUploadSuccess: function (obj) {
    obj.on('filebatchuploadsuccess', function (event, data) {
      debugger
    })
  }
}
