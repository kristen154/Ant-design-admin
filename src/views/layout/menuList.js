import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'

const { Item, SubMenu } = Menu

const iconArr = ['dashboard', 'user', 'form', 'setting', 'message', 'safety', 'bell', 'delete', 'code-o', 'poweroff', 'eye-o', 'hourglass']

export default{
  name:'menuList',
  props:{
    menuList:{
      type:Array,
      required:true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    }
  },
  data(){
    return {
      openKeys: [],
      selectedKeys:[],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: (vm) => {
      let keys = []
      vm.menuList.forEach(item => {
        keys.push(item.path)
      })
      return keys
    }
  },
  methods:{
    renderIcon(h,icon){
      var iconString = icon !== undefined ? icon : iconArr[Math.floor(Math.random()*iconArr.length)]
      return h(Icon,{props:{type:iconString}},)
    },
    renderMenuItem(h,menu){
      var that = this

      return h('a',{attrs:{href:'#'+menu.path}},[
        that.renderIcon(h,menu.icon),
        h('span',menu.name)
      ])
    },

    renderItem(h,menu,pIndex,index){
      var that = this
      return h(Item,{key:menu.path?menu.path:'item_'+pIndex+'_'+index},
          [that.renderMenuItem(h,menu)]
      )
    },

    renderSubMenu(h,menu,pIndex,index){
      var that = this
      var title = [h('span',{slot:'title'},[
        that.renderIcon(h,menu.icon),
        h('span',menu.name)
      ])]
      var subList = [];
      var pIndex_ = pIndex+'_'+index
      menu.children.forEach(function(item,i){
        subList.push(that.renderItem(h,item,pIndex_,i))
      })

      return h(SubMenu,{key:menu.path?menu.path:'subMenu_'+pIndex_},title.concat(subList));
    },

    renderMenu(h,menu,pIndex,index){
      //如果只有一个子组件，则侧栏显示子组件name,
      if(!menu.hidden){
        if(!menu.children){
          return this.renderItem(h,menu,pIndex,index);
        }
        else if(menu.children.length == 1){
          return this.renderItem(h,menu.children[0],pIndex,index);
        }else if(menu.children.length>1){
          return this.renderSubMenu(h,menu,pIndex,index)
        }
        //return menu.children ? this.renderSubMenu(h,menu,pIndex,index) : this.renderItem(h,menu,pIndex,index);
      }
    },

    renderMenuTree(h,menuTree){
      var that = this
      let menuArr = []
      menuTree.forEach(function(item,i){
        menuArr.push(that.renderMenu(h,item,'0',i))
      })
      return menuArr
    },

    onOpenChange(openKeys){
      //console.log(openKeys,this.openKeys,this.rootSubmenuKeys)
      const latestOpenKey = openKeys.find(key=>this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey)===-1){
        this.openKeys = openKeys
      }else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }


  },
  render(h){
    return h(
        Menu,
        {
          props: {
            theme: this.$props.theme,
            mode: this.$props.mode,
            openKeys:this.openKeys,
            selectedKeys:this.selectedKeys
          },
          on: {
            openChange: this.onOpenChange,
            select:(obj)=>{
              this.selectedKeys = obj.selectedKeys
              this.$emit('select',obj)
            }
          }
        },

        this.renderMenuTree(h,this.menuList)
    )
  }
}
