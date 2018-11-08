<template>
  <div>
  <el-pop-panel ref="detailPanel" width="700px" @close="handlePanelClose" v-loading="loading">
    <el-menu class="el-menu-demo el-action-bar" mode="horizontal" background-color="#F4F6F9" style="height:50px;padding: 7px;box-sizing: border-box;border:1px solid #E2E6EC;">
      <el-button-group>
        <el-button @click="handleEditFollow()" size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 添加跟进</el-button>
      </el-button-group>
    </el-menu>
    <el-row style="margin: 10px 0px;">
      <el-col :span="3"><span class="wp-item-label" style="color:#666666;">基本信息</span></el-col>
      <el-col :span="21" style="padding-top:12px;"><div style="background-color: #EEEEEE;width:100%;height:1px;"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-yunongtongxingming"></i> 姓名</span></el-col>
      <el-col :span="8"><span class="wp-item-content" v-html="getLabelValue(contact.realname)"></span></el-col>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-shouji"></i> 手机</span></el-col>
      <el-col :span="8"><span class="wp-item-content" v-html="getLabelValue(contact.mobile)"></span></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-tubiao209"></i> 邮箱</span></el-col>
      <el-col :span="8"><span class="wp-item-content" v-html="getLabelValue(contact.email)"></span></el-col>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-xingbie"></i> 性别</span></el-col>
      <el-col :span="8"><span class="wp-item-content" v-html="getLabelValue(contact.gender)"></span></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-zhiwuguanli"></i> 职务</span></el-col>
      <el-col :span="8"><span class="wp-item-content" v-html="getLabelValue(contact.post)"></span></el-col>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-dianhua"></i> 座机</span></el-col>
      <el-col :span="8"><span class="wp-item-content" v-html="getLabelValue(contact.telephone)"></span></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-tubiao215"></i> QQ</span></el-col>
      <el-col :span="8"><span class="wp-item-content" v-html="getLabelValue(contact.qqNo)"></span></el-col>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-weixin"></i> 微信</span></el-col>
      <el-col :span="8"><span class="wp-item-content" v-html="getLabelValue(contact.wxNo)"></span></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-gongsi"></i> 公司</span></el-col>
      <el-col :span="20"><span class="wp-item-content" v-html="getLabelValue(contact.customer.name)"></span></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-all"></i> 状态</span></el-col>
      <el-col :span="20"><span class="wp-item-content" v-html="getLabelValue(contact.customer.status)"></span></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-shijian"></i> 时间</span></el-col>
      <el-col :span="20"><span class="wp-item-content" v-html="formatTime(contact.customer.gainTime, 'YYYY-MM-DD')"></span></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-shijian"></i> 简介</span></el-col>
      <el-col :span="20"><span class="wp-item-content" v-html="getLabelValue(contact.customer.introduction)"></span></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><span class="wp-item-label"><i class="iconfont icon-dizhi"></i> 地址</span></el-col>
      <el-col :span="20"><span class="wp-item-content" v-html="getLabelValue(contact.customer.address)"></span></el-col>
    </el-row>

    <el-row style="margin: 10px 0px;">
      <el-col :span="3"><span class="wp-item-label" style="color:#666666;">跟进信息</span></el-col>
      <el-col :span="21" style="padding-top:12px;"><div style="background-color: #EEEEEE;width:100%;height:1px;"></div></el-col>
    </el-row>

    <timeline>
      <timeline-title>客户跟进</timeline-title>
      <timeline-item v-for="record in followList" bg-color="#3a8ee6">
        <el-collapse>
          <el-collapse-item name="1">
            <template slot="title">
              <el-row>
                <el-col :span="18">{{getFollowTitle(record)}}</el-col>
                <el-col :span="4">
                  <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEditFollow(record, $event)" circle></el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDeleteFollow(record, $event)" circle></el-button>
                </el-col>
              </el-row>
            </template>
            <div style="text-indent:2em;">{{record.feedback}}</div>
            <div v-if="record.attachments.length > 0" style="background-color: #EEEEEE;padding: 5px 10px;">
              <div v-for="attachment in record.attachments">
                <i class="iconfont icon-fujian"></i>
                <a v-if="isImage(attachment.fileName)" class="file-item" data-fancybox="images" :href="getAttachmentUrl(attachment)">{{attachment.fileName}}</a>
                <a v-else class="file-item" :href="getAttachmentUrl(attachment)">{{attachment.fileName}}</a>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </timeline-item>
    </timeline>
  </el-pop-panel>
    <follow-form ref="followForm" @close="handleFormClose()"></follow-form>
  </div>
</template>

<script>

  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
  import followForm from '../follow/followForm'
  import * as $service from '../../api/contact'
  import * as $follow from '../../api/follow'
  import * as $attachment from '../../api/attachment'

  export default {
    name: "contactDetail",
    data(){
      return {
        loading: true,
        followList:[],
        contact: {
          customer:{}
        },
      }
    },
    components: {
      Timeline,
      TimelineItem,
      TimelineTitle,
      followForm
    },
    mounted(){
      this.$refs.detailPanel.show();
      this.getPageData();
    },
    watch:{
      $route(){
        this.getPageData();
      }
    },
    methods:{
      getPageData(){
        let conatctId = this.$route.params.contactId;
        this.loading = true;
        $service.findById(conatctId).then((res) => {
          this.contact = res.data;
          $follow.findList({customerId: res.data.customer.id, page: 0, size: 1000}).then((res) => {
            this.followList = res.data.content;
          });
        });
        setTimeout(() => {
          this.loading = false;
        }, 300);

      },
      handleDeleteFollow(follow, $event){
        $event.stopPropagation();
        this.$confirm('是否删除此跟进?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $follow.deleteById(follow.id).then(() => {
            this.getPageData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },
      handleEditFollow(follow, $event){
        if($event) {
          $event.stopPropagation();
        }
        if(follow) {
          this.$refs.followForm.open({follow: follow, contact: follow.contact});
        }else{
          this.$refs.followForm.open({follow: follow, contact: this.contact});
        }

      },

      handleFormClose(){
        this.getPageData();
      },

      handlePanelClose(){
        this.$router.push({ path:'/contact'});
      },
      getLabelValue(val){
        return val? val: '<span style="color:#CCCCCC;">未设置</span>';
      },
      getFollowTitle(follow){
        return this.formatTime(follow.followTime, 'YYYY年MM月DD日   联系人：'+follow.contact.realname);
      },

      getAttachmentUrl(attachment){
        return $attachment.getAttachmentUrl(attachment.fileId)
      }

    }
  }
</script>

<style scoped>
  .timeline-item {
    position: relative;
    margin: 1.5em 0 0 28px;
    padding-bottom: 1.5em;
    border-bottom: 0px;
  }

  a.file-item{
    color: #777777;
    text-decoration: none;
  }
  a.file-item:hover{
    color: #444444;
    text-decoration: none;
  }
</style>
