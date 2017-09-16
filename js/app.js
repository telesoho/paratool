(window.onload = function () {
  var isMobile = {
    Windows: function() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
  }; 
  console.log(isMobile.any());
  var vm = new Vue({
    el: "#app",
    data: {
      list: [],
      resultList: [],
      // sortablePaste: null,
      // sortableDrop: null,
      pasteScrollbar: null,
      dropScrollbar: null,
    },
    methods: {
      // Element dragging started
      onStart1: function ( /**Event*/ evt) {
        // evt.oldIndex; // element index within parent
        vm.pasteScrollbar.disable();
        console.log(evt);
      },

      // Element dragging ended
      onEnd1: function ( /**Event*/ evt) {
        // evt.oldIndex; // element's old index within parent
        // evt.newIndex; // element's new index within parent
        console.log(evt);
        vm.pasteScrollbar.enable();
      },
      // Element is removed from the list into another list
      onRemove1: function ( /**Event*/ evt) {
        // same properties as onUpdate
        vm.pasteScrollbar.refresh();
      },
      // Element is dropped into the list from another list
      onAdd1: function ( /**Event*/ evt) {
        //var itemEl = evt.item; // dragged HTMLElement
        //evt.from; // previous list
        // + indexes from onEnd
        vm.pasteScrollbar.refresh();
      },

      // Element dragging started
      onStart2: function ( /**Event*/ evt) {
        // evt.oldIndex; // element index within parent
        vm.dropScrollbar.disable();
        console.log(evt);
      },

      // Element dragging ended
      onEnd2: function ( /**Event*/ evt) {
        // evt.oldIndex; // element's old index within parent
        // evt.newIndex; // element's new index within parent
        console.log(evt);
        vm.dropScrollbar.enable();
      },
      onChange2(evt) {
        var maxOrder = -1;
        for (var i = 0; i < this.resultList.length; i++) {
          if (this.resultList[i].order < maxOrder) {
            // Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。
            // 然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：
            Vue.set(this.resultList[i], 'color', "error");
          } else {
            Vue.set(this.resultList[i], 'color', "correct");
            maxOrder = this.resultList[i].order;
          }
        }
        this.dropScrollbar.refresh();
      },
      confuse() {
        vm.list.sort(function (a, b) {
          return Math.floor(Math.random() * 100) - 50;
        });
      },
      cleanAll() {
        vm.list = [];
        vm.resultList = [];
      },
      order() {
        // sort by order
        vm.list.sort(function (a, b) {
          return a.order - b.order;
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
              text: item
            });
          }
        });
        this.list.sort(function (a, b) {
          return Math.floor(Math.random() * 100) - 50;
        });
        this.$nextTick(function () {
          // DOM 现在更新了
          // `this` 绑定到当前实例
          this.pasteScrollbar.refresh();
          this.dropScrollbar.refresh();
        })
      }
    }
  });


  vm.pasteScrollbar = new IScroll(".left", {
    mouseWheel: true,
    useTransform: false,
    bounce: true,
    useTransition: false,
  });

  vm.dropScrollbar = new IScroll(".right", {
    mouseWheel: true,
    useTransform: false,
    bounce: true,
    useTransition: false,
  });

})