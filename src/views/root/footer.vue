<script setup></script>

<template>
  <div class="custom-footer">
    <a-space direction="vertical">
      <div>
        <a-space style="padding-top: 20px">
          <a
            href="https://beian.miit.gov.cn/"
            rel="noopener"
            target="_blank"
          >
            京ICP备 2020035293号-1
          </a>
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=65230202000142"
            style="display: flex; height: 20px; line-height: 20px"
          ><img
             src="@/assets/beian.png"
             style="float: left"
           >
            <p style="margin: 0px 0px 0px 5px; color: #939393">
              新公网安备 65230202000142号
            </p></a>
        </a-space>
      </div>
      <div>
        <a-space>
          <span>© 2020 – 2022</span>
          <icon-star />
          <span>左手逐暗灬</span>
        </a-space>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
.custom-footer {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
