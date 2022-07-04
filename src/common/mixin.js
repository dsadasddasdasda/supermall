import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin={
  //可以引入属性，函数等
  data() {
    return {
      itemImgListenter:null,
      refresh:null
    }
  },
  mounted() {
    this.refresh=debounce(this.$refs.scroll.refresh)  
    this.itemImgListener=()=>{
    this.refresh()
    }
    this.$bus.$on('imgLoad',this.itemImgListener)
    console.log('我是混入');
  },
}
//单独抽取点击回到顶部
export const backTopMinxin={
  components:{
  BackTop 
  },
  data(){
    return {
      isTabFixed:false,
      tabOffsetTop:0,
      isShow:false,
    }  
  },
  methods: {
    backClick(){
      this.$refs.scroll.scroll.scrollTo(0,0,500)
     },
  },
}