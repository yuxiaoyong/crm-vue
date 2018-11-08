<template>
  <el-upload
    class="upload-demo"
    action=""
    :http-request="uploadFile"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="handleBeforeUpload"
    :file-list="fileDataList"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">文件大小不超过5M</div>
  </el-upload>
</template>

<script>

  import * as $attachment from '../../api/attachment';

  export default {
    name: "ElUploadFile",
    props:['action', 'fileList'],
    computed:{
      fileDataList(){
        this.fileList.forEach((item) => {
          item.name = item.fileName;
          item.url = this.getFileUrl(item);
        });
        return this.fileList;
      }
    },
    methods:{
      uploadFile(params){
        $attachment.uploadFile(params);
      },
      handleBeforeUpload(file){
        this.$emit('before-upload', file);
      },
      handleSuccess: function(res, file, fileList){
        file.url = this.getFileUrl(res.data);
        file.fileId = res.data.fileId;
        this.fileList.push(res.data);
        this.$emit('on-success', res, file, fileList);
      },
      handleError(err, file, fileList){
        this.$emit('on-error', err, file, fileList);
      },
      handlePreview(file){
        this.$emit('on-preview', file);
      },
      handleRemove(file, fileList){
        this.fileList.forEach((item, index) => {
          if(item.uid == file.uid){
            this.fileList.splice(index, 1);
          }
        })
        this.$emit('on-remove', file, fileList);
      },
      getFileUrl(item){
        let suffix = item.fileName.substring(item.fileName.lastIndexOf(".")+1).toUpperCase();
        switch(suffix){
          case "JPG":
          case "JPEG":
          case "PNG":
          case "GIF":
          case "BMP":
          case "TIFF":
            return $attachment.getAttachmentUrl(item.fileId);
          case "XLS":
          case "XLSX":
            return require("../../assets/img/xlsx.png");
          case "DOC":
          case "DOCX":
            return require("../../assets/img/docx.png");
          case "PDF":
            return require("../../assets/img/pdf.png");
          case "PPT":
          case "PPTX":
            return require("../../assets/img/ppt.png");
          case "ZIP":
          case "RAR":
          case "GZ":
          case "TAR":
          case "BZ2":
          case "7Z":
            return require("../../assets/img/zip.png");
          default:
            return require("../../assets/img/file.png");
        }
      }
    }
  }
</script>

<style scoped>

</style>
