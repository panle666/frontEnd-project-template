<template>
  <div class="add-address">
    <div class="address-item">
      <div class="label">收 货 人&nbsp;&nbsp;：</div>
      <input v-model="adddressViewArgs.Consignee" type="text" maxlength="50" name="user" placeholder="姓名" placeholder-style="color:#bfbfbf;" />
    </div>
    <div class="address-item">
      <div class="label">联系方式 ：</div>
      <input v-model="adddressViewArgs.MobilePhone" type="tel" maxlength="11" name="phone" placeholder="手机号码" placeholder-style="color:#bfbfbf;" />
    </div>
    <div v-if="linkageResult" class="address-item">
      <div class="label">所在地区 ：</div>

      <div @click="isShowCityPicker = true" class="picker">
        <span v-if="!pcdsText">请选择</span>
        <span class="selectText" v-if="pcdsText">{{ pcdsText }}</span>
      </div>
    </div>
    <div class="address-item">
      <div class="label">详细地址 ：</div>
      <input v-model="adddressViewArgs.Address" maxlength="50" type="text" name="address" placeholder="请输入详细的地址信息" placeholder-style="color:#bfbfbf;" />
    </div>
    <div class="radio-group address-set">
      <div @click="changeSelect" class="circleDiv">
        <div class="circle" :class="{ selected: adddressViewArgs.IsDefault }"></div>
        <div>设为默认地址</div>
      </div>
    </div>
    <div @click="editOrAddAddress" class="address-btn">
      <div>确定</div>
    </div>
    <cityPicker v-if="linkageResult" @close="emitCloseCityPicker" :linkageAreas="linkageResult.linkageAreas" :visible="isShowCityPicker" />
  </div>
</template>

<script lang="ts" src="./operateAddress.ts"></script>

<style lang="less" scoped>
@import './operateAddress';
</style>
