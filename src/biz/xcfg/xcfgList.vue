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
        url: "http://article/NoticeAdminList",
        columns: [
          {
            title: "ID",
            name: "ID",
            isHide: true
          },
          {
            title: "TopicLang",
            name: "Title",
            isSearch: true
          },
          {
            title: "IsTopLang",
            name: "IsTop",
            isSearch: true
          },
          {
            title: "PublishOrgLang",
            name: "PubDept",
            isSearch: true,
          },
          {
            title: "IsPublishLang",
            name: "IsChecked",
            isSearch: true,
          }
        ],
        fnRowCallback: function(row, data) {
          if (data.IsTop == 1) {
            $("td:eq(3)", row).html(YesLang);
          } else {
            $("td:eq(3)", row).html(NoLang);
          }
          if (data.IsChecked == 1) {
            $("td:eq(5)", row).html(YesLang);
          } else {
            $("td:eq(5)", row).html(NoLang);
          }
        },
        idName: "ID",
        functions: {
          common: [
            {
              text: "EditAdviceLang",
              url: "adadd",
              mode: "navigate",
              functionName: "PrePublish Advice"
            },
            {
              text: "PublishAdviceLang",
              url: "/admin/article/PublishAdvice",
              functionName: "Publish Advice",
              tips: "IsSureToPublish",
              limitSelected: "1"
            }
          ]
        },
        operations: [
          {
            text: "SeeLang",
            url: "adview",
            functionName: "View Advice"
          }
        ]
      }
    };
  }
};
</script>