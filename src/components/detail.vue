<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <el-carousel trigger="click" height="350px">
                  <el-carousel-item v-for="(item,index) in imglist" :key="index">
                    <img :src="item.original_path" alt>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number
                          v-model="num1"
                          @change="changeHander"
                          :min="1"
                          :max="num3"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity | changenum}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" @click="showDesc=true" :class="{'selected':showDesc}">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="showDesc=false" :class="{'selected':!showDesc}">商品评论</a>
                  </li>
                </ul>
              </div>
              <div v-if="showDesc" class="tab-content entry" style="display: block;" v-html="goodsinfo.content"></div>
              <div v-else class="tab-content" style="display: block;">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          v-model="comment"
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          @keyup.enter="open"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        
                          <input
                            @click="open"
                            @keyup.enter="open"
                            id="btnSubmit"
                            name="submit"
                            type="submit"
                            value="提交评论"
                            class="submit"
                          >
                        
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>

                  <ul id="commentList" class="list-box">
                    <p
                      v-if="!message.message"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in message.message" :key="index">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="currentPage2"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="currentPage3"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item, index) in hotgoodslist" :key="index">
                    <div class="img-box">
                      <router-link :to="'/detail/'+item.id">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                        <router-link :to="'/detail/'+item.id">
                     {{item.title}}
                      </router-link>
                      <span>{{item.add_time | changetime}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "detail",
  data() {
    return {
      currentPage3: 10,
      currentPage2: 5,
      currentPage4: 1,
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      num1: 1,
      comment: "", //提交的评论
      message: {}, //评论的列表
      num2: 1, //当前评论页数
      num3: 0 ,//商品库存
      showDesc:true//是否显示高亮
    };
  },
  methods: {
    open() {
      this.$axios
        .post(`/site/validate/comment/post/goods/${this.$route.params.id}`, {
          commenttxt: this.comment
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.comment = "";
            this.$axios
              .get(
                `/site/comment/getbypage/goods/${
                  this.$route.params.id
                }?pageIndex=1&pageSize=3`
              )
              .then(res => {
                this.currentPage3 = res.data.message.totalcount;
                this.message = res.data;
              });
          }
        });
      this.$message({ message: "评论成功", type: "success" });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage2 = val;
      this.xuanranpl(this.currentPage4, this.currentPage2)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$axios
        .get(
          `/site/comment/getbypage/goods/${
            this.$route.params.id
          }?pageIndex=${val}&pageSize=${this.currentPage2}`
        )
        .then(res => {
          this.message = res.data;
        });
    },
    changeHander(value) {
      console.log(value);
    },
    xuanranpl(index, size) {
      if (index < 1) {
        index = 1;
        this.num2 = 1;
      }
      this.$axios
        .get(
          `/site/comment/getbypage/goods/${
            this.$route.params.id
          }?pageIndex=${index}&pageSize=${size}`
        )
        .then(res => {
          this.message = res.data;
        });
    }
  },
  created() {
    this.$axios
      .get(`/site/goods/getgoodsinfo/${this.$route.params.id}`)
      .then(res => {
        console.log(res);
        this.num3 = res.data.message.goodsinfo.stock_quantity;
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
      });
    this.$axios
      .get(
        `/site/comment/getbypage/goods/${
          this.$route.params.id
        }?pageIndex=1&pageSize=${this.currentPage2}`
      )
      .then(res => {
        this.message = res.data;
        this.num2 = res.data.pageIndex;
        this.currentPage3=res.data.totalcount;
      });
  },
  watch:{
      '$route.params.id'(nv){
          this.$axios
      .get(`/site/goods/getgoodsinfo/${nv}`)
      .then(res => {
        console.log(res);
        this.num3 = res.data.message.goodsinfo.stock_quantity;
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
      });
      this.$axios
      .get(
        `/site/comment/getbypage/goods/${nv}?pageIndex=1&pageSize=3`
      )
      .then(res => {
        this.message = res.data;
        this.num2 = res.data.pageIndex;
      });
      }
      
  },
  filters: {
    changenum(value) {
      return value;
    }
  }
};
</script>

<style>
.tab-content img {
  display: block;
  width: 100%;
}
.pic-box {
  height: 370px;
  width: 380px;
}
.pic-box img {
  width: 100%;
}
</style>
