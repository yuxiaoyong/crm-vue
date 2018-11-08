<template>
  <div>

    <timeline>
      <timeline-title>2018</timeline-title>
      <timeline-item bg-color="lightgreen">item1</timeline-item>
      <timeline-item :hollow="true">
        <el-collapse>
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
        </el-collapse>
      </timeline-item>
      <timeline-item :hollow="true">item2</timeline-item>
      <timeline-title>2017</timeline-title>
      <timeline-item :hollow="true">item2</timeline-item>
      <timeline-item :hollow="true">item2</timeline-item>
    </timeline>
  </div>
</template>

<script>
  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

  export default {
    components: {
      Timeline,
      TimelineItem,
      TimelineTitle
    }
  }
</script>
