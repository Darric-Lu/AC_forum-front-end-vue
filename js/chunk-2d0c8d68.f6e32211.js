(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c8d68"],{"571a":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container py-5"},[e("NavTabs"),e("h1",{staticClass:"mt-5 text-center"},[t._v("人氣餐廳")]),e("hr"),t.isLoading?e("Spinner"):t._l(t.restaurantsTops,(function(t){return e("TopCards",{key:t.id,attrs:{initinalRestaurant:t}})}))],2)},n=[],s=e("1da1"),i=(e("96cf"),e("4de4"),e("8bb1")),c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card mb-3",staticStyle:{"max-width":"540px",margin:"auto"}},[e("div",{staticClass:"row no-gutters"},[e("div",{staticClass:"col-md-4"},[e("router-link",{attrs:{to:{name:"restaurant-dashboard",params:{id:t.restaurant.id}}}},[e("img",{staticClass:"card-img",attrs:{src:t.restaurant.image}})])],1),e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title"},[t._v(t._s(t.restaurant.name))]),e("span",{staticClass:"badge badge-secondary"},[t._v("收藏數："+t._s(t.restaurant.FavoriteCount))]),e("p",{staticClass:"card-text"},[t._v(" "+t._s(t.restaurant.description)+" ")]),e("router-link",{staticClass:"btn btn-primary mr-2",attrs:{to:{name:"restaurant-dashboard",params:{id:t.restaurant.id}}}},[t._v("Dashboard")]),t.restaurant.isFavorited?e("button",{staticClass:"btn btn-danger mr-2",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),a.stopPropagation(),t.unFavorite(t.restaurant.id)}}},[t._v(" 移除最愛 ")]):e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),a.stopPropagation(),t.addFavorite(t.restaurant.id)}}},[t._v(" 加到最愛 ")])],1)])])])},u=[],o=e("5530"),d=e("4cce"),l=e("2fa3"),p={name:"UserCommentsCard",props:{initinalRestaurant:{type:Object,required:!0}},data:function(){return{restaurant:[]}},created:function(){this.fetchRestaurantTop()},methods:{fetchRestaurantTop:function(){this.restaurant=this.initinalRestaurant},addFavorite:function(t){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d["a"].addFavorite({restaurantId:t});case 3:if(r=e.sent,n=r.data,"success"===n.status){e.next=7;break}throw new Error(n.message);case 7:s=a.restaurant.FavoriteCount+1,a.restaurant=Object(o["a"])(Object(o["a"])({},a.restaurant),{},{isFavorited:!0,FavoriteCount:s}),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),l["a"].fire({icon:"error",title:"無法將餐廳加入最愛，請稍後再試"});case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()},unFavorite:function(t){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d["a"].deleteFavorite({restaurantId:t});case 3:if(r=e.sent,n=r.data,"success"===n.status){e.next=7;break}throw new Error(n.message);case 7:s=a.restaurant.FavoriteCount-1,a.restaurant=Object(o["a"])(Object(o["a"])({},a.restaurant),{},{isFavorited:!1,FavoriteCount:s}),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),l["a"].fire({icon:"error",title:"無法將餐廳刪除最愛，請稍後再試"});case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()}}},v=p,b=e("2877"),f=Object(b["a"])(v,c,u,!1,null,null,null),m=f.exports,h=e("c4c3"),g=e("2375"),C={components:{NavTabs:i["a"],TopCards:m,Spinner:g["a"]},data:function(){return{restaurantsTops:[],isLoading:!0}},created:function(){this.fetchRestaurantTop()},methods:{fetchRestaurantTop:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var e,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,h["a"].getRestaurantsTop();case 3:e=a.sent,r=e.data,t.restaurantsTops=r.restaurants.filter((function(t){return t})),t.isLoading=!1,a.next=13;break;case 9:a.prev=9,a.t0=a["catch"](0),t.isLoading=!1,l["a"].fire({icon:"error",title:"無法載入人氣餐廳，請稍後再試"});case 13:case"end":return a.stop()}}),a,null,[[0,9]])})))()}}},w=C,x=Object(b["a"])(w,r,n,!1,null,null,null);a["default"]=x.exports}}]);
//# sourceMappingURL=chunk-2d0c8d68.f6e32211.js.map