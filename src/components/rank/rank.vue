<template>
  <div class="rank">
    <scroll class="toplist" :data="topList">
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.picUrl" width="100" height="100"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, idx) in item.songList">
              <span>{{idx + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getTopList} from '../../common/api/rank';
  import {ERR_OK} from '../../common/api/config';
  import Scroll from '../../base/scroll/scroll';
  import Loading from '../../base/loading/loading';
  import {mapMutations, mapGetters} from 'vuex';
  export default {
    data() {
      return {
        topList: []
      };
    },
    created() {
      this._getTopList();
    },
    methods: {
      _getTopList() {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList;
          }
        });
      },
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        });
        this.setTopList(item);
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      }),
      ...mapGetters([
        'topList'
      ])
    },
    components: {
      Scroll,
      Loading
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &.last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)


</style>
