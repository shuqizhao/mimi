<template>
<div class="content-wrapper">
  <section v-if="cfg.title" class="content-header">
      <h1>
        {{cfg.title}}
        <small>{{cfg.desc}}</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
        <li class="active">Here</li>
      </ol>
  </section>
  <section class="content container-fluid">
    <div class="box">
        <div class="box-header">
            <div class="searchDataTableTop  row-fluid" style="height:auto">
              <div class="col-md-10" style="border-right:1px dashed blue">
                  <form class="form-inline" role="form" style="margin-bottom:-25px;">
                      <div v-for="column in getSearchItems()" class="form-group" style="margin-bottom:25px;margin-right:15px;display:inline-block;">
                          <label for="name">{{column.title}}：</label>
                          <i v-if="column.type=='combox'" class="fa fa-fw fa-list-alt"></i>
                          <i v-else-if="column.type=='timer'" class="fa fa-fw fa-clock-o"></i>
                          <i v-else-if="column.type=='suggest'" class="fa fa-fw  fa-th-list"></i>
                          <i v-else class="fa fa-fw fa-text-height"></i>
                          <div v-if="column.type=='combox'" class="input-group">
                            <select class="form-control" :id="column.name" style="width:200px;">
                                <option v-for="item in column.data" :value="item.id">{{item.value}}</option>
                            </select>
                          </div>
                          <div v-else-if="column.type=='timer'" class="input-group" v-bind="bindTimer(column.name)">
                            <input type="text" class="form-control" :id="column.name" :name="column.name" style="width:232px;"/>
                          </div>
                          <div v-else-if="column.type=='suggest'" class="input-group">
                              <input :id="column.name" :name="column.name" type="text" style="width:168px;margin-right:0px;" class="form-control" :controltype='column.type' />
                              <div class="input-group-btn" style="display:inline;margin-left:0px;">
                                  <button type="button" class="btn btn-default dropdown-toggle btn-suggest" data-toggle="dropdown">
                                      <span class="caret"></span>
                                  </button>
                                  <ul :class="'dropdown-menu dropdown-menu-right dropdown-suggest-'+column.name" role="menu">
                                  </ul>
                              </div>
                          </div>
                          <!-- <script v-if="column.type=='suggest'" type="text/javascript">
                              var data=[];
                              <% _.each(column.data, function(option,i) { %>
                                  data.push({id:"<%=option.id%>",word:"<%=option.word%>",description:"<%=option.description%>"});
                              <%})%>
                                  $("#<%=column.name%>").bsSuggest({
                                  indexId: 0, //data.value 的第几个数据，作为input输入框的内容
                                  indexKey: 1, //data.value 的第几个数据，作为input输入框的内容
                                  data: {
                                  'value':data
                              }
                              });
                          </script> -->
                          <div v-else class="input-group">
                          <input  type="text" class="form-control" :id="column.name" autocomplete="off"/>
                          </div>
                      </div>
                  </form>
              </div>
              <div class="col-md-2">
                  <center>
                      <button class="btn btn-primary btn-large btn-searchDataTable glyphicon glyphicon-search">
                        搜索
                      </button>
                  </center>
              </div>
        </div>

        </div>
        <div class="box-body">
            <table id="tableList" class="table table-bordered table-hover">
            </table>
        </div>
    </div>
  </section>
</div>
</template>

<script>
import "datatables.net-bs/css/dataTables.bootstrap.css";
import "datatables.net/js/jquery.dataTables";
import "datatables.net-bs/js/dataTables.bootstrap";

import "bootstrap-daterangepicker/daterangepicker.css";
import "bootstrap-daterangepicker/daterangepicker";

export default {
  props: ["cfg"],
  mounted: function() {
    var GodData = {};
    var searchColumns = [];
    var aoColumns = [];
    if (this.cfg.functions) {
      aoColumns.push({
        sTitle:
          '<center><input type="checkbox" class="searchDataTableCheckAll" /></center>',
        mDataProp: [0],
        sName: "",
        bSearchable: false,
        bSortable: false,
        fnRender: function(oObj) {
          var str =
            '<center><input type="checkbox" value="' +
            oObj.aData[cfg.idName] +
            '" /></center>';
          return str;
        } //自定义列的样式
      });
    }
    var OperationLang = "Operation";
    var SearchLang = "Search";
    var MoreLang = "More";

    if (this.cfg.operations) {
      var ops = [];
      for (var i = 0; i < this.cfg.operations.length; i++) {
        var op = this.cfg.operations[i];
        var isUse = true;
        if (op.functionName) {
          isUse = false;
          if ($.inArray(op.functionName, GodData.Functions) != -1) {
            isUse = true;
          }
        }
        if (!isUse) {
          continue;
        }
        ops.push(op);
      }
      this.cfg.operations = ops;
      aoColumns.push({
        sTitle: OperationLang,
        mDataProp: [1],
        sName: "",
        bSearchable: false,
        bSortable: false,
        fnRender: function(oObj) {
          var str = "";
          for (var i = 0; i < this.cfg.operations.length; i++) {
            var op = this.cfg.operations[i];

            if (i != 0) {
              str += " | ";
            }
            var idName = op.idName ? op.idName : cfg.idName;
            var presuff = "";

            if (
              op.url.indexOf("frame?url=") >= 0 ||
              op.url.indexOf("address?url=") >= 0
            ) {
              presuff = "?";
            } else {
              presuff = op.url.indexOf("?") > 0 ? "&" : "?";
            }
            var paramUrl = presuff + "id=" + oObj.aData[idName];
            if (this.cfg.urlParams) {
              for (var j = 0; j < cfg.urlParams.length; j++) {
                paramUrl +=
                  "&" + cfg.urlParams[j] + "=" + oObj.aData[cfg.urlParams[j]];
              }
            }
            if (!op.target) {
              op.target = "_self";
            }
            if (op.url == "#") {
              str +=
                '<a class="' +
                op.name +
                '" data="' +
                paramUrl +
                '">' +
                op.text +
                "</a>";
              continue;
            }
            if (op.url.indexOf("address?url=") >= 0) {
              str +=
                '<a href="/' +
                op.url.replace("address?url=", "") +
                paramUrl +
                '" target="' +
                op.target +
                '">' +
                op.text +
                "</a>";
            } else {
              str +=
                '<a href="#' +
                op.url +
                paramUrl +
                '" target="' +
                op.target +
                '">' +
                op.text +
                "</a>";
            }
          }
          return str;
        } //自定义列的样式
      });
    }
    for (var i = 0; i < this.cfg.columns.length; i++) {
      var column = this.cfg.columns[i];
      if (column.isSearch) {
        searchColumns.push(column);
      }
      if (!column.isHide) {
        aoColumns.push({
          sTitle: column.title,
          mDataProp: column.name,
          sName: column.name,
          sWidth: column.width
        });
      }
    }

    // var data = {
    //   columns: searchColumns,
    //   title: this.cfg.title,
    //   SearchLang: SearchLang
    // };
    // self.$el.html(self.template(data));
    var searchDataTableTop = $(this.$el).find(".searchDataTableTop");
    if (searchColumns.length == 0) {
      searchDataTableTop.hide();
    }

    var span10Height = searchDataTableTop.find(".span10").height();
    searchDataTableTop.find(".span2").height(span10Height);

    var searchButton = searchDataTableTop.find(".btn-searchDataTable");

    var searchButtonHeight = searchButton.outerHeight();
    searchButton.css(
      "margin-top",
      (span10Height - searchButtonHeight) / 2 + "px"
    );

    var dataTableCfg = {
      sAjaxSource: this.cfg.url,
      aoColumns: aoColumns,
      aoColumnDefs: [
        {
          sDefaultContent: "",
          aTargets: ["_all"]
        }
      ],
      fnDrawCallback: function(oSettings) {}
    };

    $(this.$el)
      .find(".dataTables_filter")
      .hide();
    var buttons = "";
    //功能按钮处理
    var functions = this.cfg.functions;
    if (functions) {
      if (functions && functions.common) {
        var ops = [];
        for (var i = 0; i < functions.common.length; i++) {
          var op = functions.common[i];
          var isUse = true;
          if (op.functionName) {
            isUse = false;
            if ($.inArray(op.functionName, GodData.Functions) != -1) {
              isUse = true;
            }
          }
          if (!isUse) {
            continue;
          }
          ops.push(op);
        }
        functions.common = ops;
        for (var i = 0; i < functions.common.length; i++) {
          var button = functions.common[i];
          buttons +=
            "<button id='" +
            button.text +
            "' class='btn btn-success searchDataTableMoreOp' url='" +
            button.url +
            "' mode='" +
            button.mode +
            "' style='margin-left:10px;' limitSelected='" +
            button.limitSelected +
            "' tips='" +
            button.tips +
            "'>" +
            button.text +
            "</button>";
        }
      }
      if (functions.more) {
        var ops = [];
        for (var i = 0; i < functions.more.length; i++) {
          var op = functions.more[i];
          var isUse = true;
          if (op.functionName) {
            isUse = false;
            if ($.inArray(op.functionName, GodData.Functions) != -1) {
              isUse = true;
            }
          }
          if (!isUse) {
            continue;
          }
          ops.push(op);
        }
        functions.more = ops;
        if (ops.length != 0) {
          buttons += '<div class="btn-group" style="margin-left:10px;" >';
          buttons +=
            '<button type="button" class="btn btn-success">' +
            MoreLang +
            "</button>";
          buttons +=
            '<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">';
          buttons += '<span class="caret"></span>';
          buttons += '<span class="sr-only"></span>';
          buttons += "</button>";
          buttons += '<ul class="dropdown-menu dropdown-ul-menu" role="menu">';
          if (functions && functions.more) {
            for (var i = 0; i < functions.more.length; i++) {
              var button = functions.more[i];
              buttons +=
                '<li><a class="searchDataTableMoreOp" id="' +
                button.text +
                '" url="' +
                button.url +
                '" mode="' +
                button.mode +
                '" limitSelected="' +
                button.limitSelected +
                '" tips="' +
                button.tips +
                '" >' +
                button.text +
                "</a></li>";
              buttons += '<li class="divider"></li>';
            }
          }
          buttons += "</ul>";
          buttons += "</div>";
        }
      }
    }
    $(this.$el)
      .find(".dataTables_function")
      .html(buttons);
    $(this.$el).resize(function() {
      var searchDataTableTop = self.$el.find(".searchDataTableTop");

      var span10Height = searchDataTableTop.find(".span10").height();
      searchDataTableTop.find(".span2").height(span10Height);

      var searchButton = searchDataTableTop.find(".btn-searchDataTable");

      var searchButtonHeight = searchButton.outerHeight();
      searchButton.css(
        "margin-top",
        (span10Height - searchButtonHeight) / 2 + "px"
      );
    });

    // var cfg = {
    //   paging: true,
    //   lengthChange: true,
    //   searching: true,
    //   ordering: true,
    //   info: true,
    //   autoWidth: false
    // };
    var cfg = {
      oLanguage: {
        sProcessing: "处理中...",
        sLengthMenu: "每页 _MENU_ 条记录",
        sZeroRecords: "没有匹配的记录",
        sInfo: "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
        sInfoEmpty: "显示第 0 至 0 项记录，共 0 项",
        sInfoFiltered: "(由 _MAX_ 项记录过滤)",
        sInfoPostFix: "",
        sSearch: "过滤:",
        sUrl: "",
        oPaginate: {
          sFirst: "首页",
          sPrevious: "上页",
          sNext: "下页",
          sLast: "末页"
        }
      },
      bRetrieve: true,
      bFilter: true,
      bPaginate: true,
      bServerSide: true,
      bLengthChange: true,
      sServerMethod: "POST",
      sDom: '<"H"<"dataTables_function"/>rp>t<"F"lip>'
    };

    var lastCfg = $.extend(true, cfg, this.cfg, dataTableCfg);
    $("#tableList").DataTable(lastCfg);
  },
  data() {
    return {};
  },
  methods: {
    getSearchItems: function() {
      var searchColumns = [];
      for (var i = 0; i < this.cfg.columns.length; i++) {
        var column = this.cfg.columns[i];
        if (column.isSearch) {
          searchColumns.push(column);
        }
      }
      return searchColumns;
    },
    bindTimer: function(id) {
      $(function() {
        $("#" + id).daterangepicker(
          {
            timePicker: true,
            timePicker24Hour: true,
            linkedCalendars: false,
            autoUpdateInput: false,
            timePickerIncrement: 30,
            locale: {
              format: "YYYY/MM/DD H:mm",
              separator: " ~ ",
              applyLabel: "应用",
              cancelLabel: "取消",
              resetLabel: "重置"
            }
          },
          function(start, end, label) {
            var beginTimeStore = start;
            var endTimeStore = end;
            if (!this.startDate) {
              this.element.val("");
            } else {
              this.element.val(
                this.startDate.format(this.locale.format) +
                  this.locale.separator +
                  this.endDate.format(this.locale.format)
              );
            }
          }
        );
      });
    }
  }
};
</script>

<style>

</style>
