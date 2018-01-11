<template>
  <list :cfg="cfg"></list>
</template>
<script>
export default {
  data() {
    return {
      cfg: {
        title:'xcfg list',
        desc:'小事一桩',
        SearchLang:'搜索',
        url: "http://localhost:1101/cfg/list?env=dev",
        columns: [
          {
            title: "ID",
            name: "ID",
            isHide: true
          },
          {
            title: "TopicLang",
            name: "Title",
            isSearch: true,
             type:'suggest'
          },
          {
            title: "IsTopLang",
            name: "IsTop",
            isSearch: true,
            type:'combox'
          },
          {
            title: "PublishOrgLang",
            name: "PubDept",
            isSearch: true,
             type:'timer'
          },
          {
            title: "IsPublishLang",
            name: "IsChecked",
            isSearch: true,
          }
        ],
        fnRowCallback: function(row, data) {
          if (data.IsTop == 1) {
            $("td:eq(3)", row).html('YesLang');
          } else {
            $("td:eq(3)", row).html('NoLang');
          }
          if (data.IsChecked == 1) {
            $("td:eq(5)", row).html('YesLang');
          } else {
            $("td:eq(5)", row).html('NoLang');
          }
        },
        idName: "ID",
        functions: {
          common: [
            {
              text: "EditAdviceLang",
              url: "adadd",
              mode: "navigate",
            },
            {
              text: "PublishAdviceLang",
              url: "/admin/article/PublishAdvice",
              tips: "IsSureToPublish",
              limitSelected: "1"
            }
          ],
          more: [
            {
              text: "EditAdviceLang",
              url: "adadd",
              mode: "navigate",
            },
            {
              text: "PublishAdviceLang",
              url: "/admin/article/PublishAdvice",
              tips: "IsSureToPublish",
              limitSelected: "1"
            }
          ],
        },
        operations: [
          {
            text: "SeeLang",
            url: "adview",
          }
        ]
      }
    };
  }
};
</script>