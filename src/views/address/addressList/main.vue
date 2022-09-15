<template>
  <div class="address" v-if="addressList">
    <div v-for="(a,aIndex) in addressList" :key="aIndex" class="slide" @touchstart="touchS" @touchmove="touchM($event,aIndex)">
      <div class="contents_wrapper" :style="{right:(aIndex==inx?(del/100)+'rem':'')}">
        <div class="contents">
          <div v-if="isSelect" class="select" @click="setActive(aIndex);selectAddressGoback(a.ID)" :class="{'select_active':aIndex==selectIndex}">
            <i class="gou"></i>
          </div>
          <div @click="setActive(aIndex);selectAddressGoback(a.ID)" class="con">
            <div class="info">
              <span class="name">{{a.Accepter}}</span>
              <span class="tel">{{a.MobilePhone}}</span>
            </div>
            <div class="ads">{{a.Province+a.City+a.District+a.Street+' '+a.Address}}</div>
          </div>
          <i @click="goEditAddress(a.ID)" class="edit"></i>
        </div>
      </div>
      <div class="delete" @click="delById(a.ID)" ref="remove">删除</div>
    </div>
    <div @click="goAddAddress" class="btn">新增收货地址</div>
  </div>
</template>
<script lang="ts" src="./addressList.ts"></script>

<style lang="less" scoped>
@import './addressList';
</style>


