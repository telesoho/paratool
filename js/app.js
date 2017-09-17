(window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      list: [],
      resultList: [],
      helpDialogVisible: false,
      AboutDialogVisible: false,
    },
    methods: {
      onChange2(evt) {
        var maxOrder = -1;
        for (var i = 0; i < this.resultList.length; i++) {
          if (this.resultList[i].order < maxOrder) {
            // Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。
            // 然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：
            // Vue.set(this.resultList[i], 'color', "error");
            this.resultList[i].color = "error";
          } else {
            this.resultList[i].color = "correct";
            // Vue.set(this.resultList[i], 'color', "correct");
            maxOrder = this.resultList[i].order;
          }
        }
      },
      confuse() {
        vm.list.sort(function (a, b) {
          return Math.floor(Math.random() * 100) - 50;
        });
        this.$message({
          message: '左边区域的段落已经被扰乱',
          type: 'success'
        });        
      },
      reset() {
        this.list = this.list.concat(this.resultList);
        this.resultList = [];
        this.$message({
          message: '段落已经重置到左边的区域',
          type: 'success'
        });
      },
      order() {
        // sort by order
        vm.list.sort(function (a, b) {
          return a.order - b.order;
        });
        this.$message({
          message: '左边区域的段落已经按正确的顺序排序',
          type: 'success'
        }); 
      },
      onPaste(e) {
        var clipboardData, pastedData;
        // Stop data actually being pasted into div
        e.stopPropagation();
        e.preventDefault();
        // Get pasted data via clipboard API
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('text/plain');
        // htmlData = clipboardData.getData('text/html');
        texts = pastedData.split(/\r\n|\r|\n/);
        this.list = [];
        this.resultList = [];
        texts.forEach(function (item, index) {
          if (item.trim() != "") {
            vm.list.push({
              order: index,
              color: "correct",
              text: item
            });
          }
        });
        this.list.sort(function (a, b) {
          return Math.floor(Math.random() * 100) - 50;
        });

      }
    }
  });
})