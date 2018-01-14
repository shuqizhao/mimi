<template>
<div class="content-wrapper">
    <!-- Horizontal Form -->
    <div class="box box-info">
        <div v-if="cfg.title" class="box-header with-border">
            <h3 class="box-title">{{cfg.title}}</h3>
            <small>{{cfg.desc}}</small>
        </div>
        <!-- /.box-header -->
        <!-- form start -->
        <form class="form-horizontal" onsubmit='return false;' role="form">
            <div class="box-body">
                <div v-for="item in cfg.items" class="form-group">
                    <label v-if="item.type!='hidden'" class="col-sm-2 control-label" for="name">{{item.title}}</label>
                    <div class="col-sm-8">
                        <div v-if="item.type=='baidutext'">
                            <div v-if="cfg.mode=='detailEdit'||cfg.mode=='create'" class="textarea">
                                <hiden :id="item.name" :name="item.name" class="form-control" rows="5" :controltype='item.type'/>
                                <div :id="item.name+1" class="baiduedit" type="text/plain" style="width:800px;height:500px;"></div> 
                            </div>
                        </div>
                        <div v-if="cfg.mode=='edit'||cfg.mode=='create'||(cfg.mode=='detailEdit'&&cfg.detailEditMode=='edit')">
                            <input v-if="item.type=='hidden'" :id="item.name" type="hidden" class="form-control" :value="detail[item.name]" :controltype='item.type' />
                            <input v-else-if="item.type=='text'" :id="item.name" :name="item.name" type="text" :placeholder="item.placeholder" class="input-xlarge form-control" :value="detail[item.name]" :controltype='item.type' />
                            <textarea v-else-if="item.type=='textarea'" :id="item.name" :name="item.name" style='width:270px;' class="form-control" rows="5" :controltype='item.type' :value="detail[item.name]"></textarea>
                            <iframe v-else-if="item.type=='textxml'" :id="item.name" :name="item.name" style='width:100%;' scrolling="no" frameborder="0" class="form-control" :controltype='item.type' src="/static/bi/compents/codemirror.html"></iframe>
                            <input v-else-if="item.type=='pwd'" :id="item.name" :name="item.name" type="password" :placeholder="item.placeholder" class="input-xlarge form-control" :value="detail[item.name]" :controltype='item.type' />
                            <select v-else-if="item.type=='combox'" :id="item.name" style='width:284px;' class="input-xlarge form-control" :controltype='item.type'>
                                <!-- <option v-for="option in item.data" v-if="option.id==detail[item.name]" selected="selected" :value="option.id">{{option.value}}</option>
                                <option :value="option.id">{{option.value}}</option> -->
                            </select>
                            <input  v-else-if="item.type=='timer'" :id="item.name" :name="item.name" type="text" :placeholder="item.placeholder" class="form-control" :controltype='item.type' :value="detail[item.name]" />
                            <div v-else-if="item.type=='uploader'">
                                    <input :id="item.name" :name="item.name" type="text" :value="displayValue" class="form-control" :controltype='item.type' style="width: 0;height: 0;border: 0;background: transparent;" />
                                    <p :id="item.name+1" style="line-height:29px;display:inline;">
                                        <a target="_bank" :href='displayLink'>
                                            {{displayText}}
                                        </a>
                                    </p>
                                    &nbsp;&nbsp;&nbsp;
                                    <img :id="item.name+3" src="" style="display:none" />
                                    <div :id="item.name+2" style="width:400px;"></div>
                            </div>
                            <div v-else-if="item.type=='suggest'" class="input-group">
                                <input :id="item.name" :name="item.name" type="text" style="width:230px;margin-right:0px;" class="form-control" :controltype='item.type' />
                                <div class="input-group-btn" style="display:inline;margin-left:0px;">
                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" style="display:inline;margin-left:0px;">
                                        <span class="caret"></span>
                                    </button>
                                    <ul :class="'dropdown-menu dropdown-menu-right dropdown-suggest-'+item.name" role="menu">
                                    </ul>
                                </div>
                            </div>
                            <label v-else-if="item.type=='yesno'" class="checkbox">
                                <input :id="item.name" :name="item.name" type="checkbox" class="form-control" :value="detail[item.name]" :controltype='item.type' />
                            </label>
                            <div v-else-if="item.type=='select2select'">
                                <div :id="item.name"></div>
                                <input :id="item.name" type="hidden" :value="detail[item.name]" class="form-control" />
                            </div>
                            <div v-else-if="item.type=='tree'">
                                <input :id="item.name" type="hidden" :value="detail[item.name]" class="form-control" />
                                <div class="controls customTree">
                                    <table border="0">
                                        <tr>
                                            <td>ResourcesLang↓</td>
                                            <td>HaveResourcesLang↓</td>
                                        </tr>
                                        <tr>
                                            <td><ul :id="item.name+1" class="ztree"></ul></td>
                                            <td align="center"><ul :id="item.name+2" class="ztree" style="margin-right: 20px;"></ul></td>
                                        </tr>
                                    </table>
                                    <p class="help-block"></p>
                                </div>
                            </div>
                        </div>
                        <div v-if="cfg.mode=='detail'||(cfg.mode=='detailEdit'&&cfg.detailEditMode!='edit')" class="input-group">
                            <input v-if="item.type=='hidden'" :id="item.name" type="hidden" class="form-control" :value="detail[item.name]" :controltype='item.type' />
                            <div v-if="item.type=='yesno'">
                                <b v-if="detail[item.name]==1" class="icon-ok" style="margin-top:8px;"></b>
                                <b v-else class="icon-remove" style="margin-top:8px;"></b>
                            </div>
                            <div v-else-if="item.type=='uploader'">
                                <input :id="item.name" :name="item.name" type="text" :value="displayValue" class="form-control" :controltype='item.type' style="width: 0;height: 0;border: 0;background: transparent;" />
                                <p id="<%=item.name+1%>" style="line-height:29px;display:inline;">
                                    <a target="_bank" :href='displayLink'>
                                        {{displayText}}
                                    </a>
                                </p>
                            </div>
                            <iframe v-else-if="item.type=='textxml'" :id="item.name" :name="item.name" style='width:100%;' scrolling="no" frameborder="0" class="form-control" :controltype='item.type'></iframe>
                            <ul v-else-if="item.type=='tree'" :id="item.name+1" class="ztree"></ul>
                            <label v-else-if="item.type!='hidden'">{{detail[item.name]}}</label>
                        </div>
                    </div>
                    <span class="col-sm-2 help-block">
                            {{item.helpblock}}
                    </span>
                </div>  
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <!-- Button -->
                <div v-if="cfg.mode=='edit'||cfg.mode=='create'">
                    <button class="btn btn-primary btn-commit">SaveLang</button>
                    <button class="btn btn-info btn-cancel" data-dismiss="modal" aria-hidden="true">CancelLang</button>
                    <div v-if="cfg.buttons">
                        <button v-for="item in cfg.buttons" :class="'btn '+item.type+' btn-buttons'" :name='item.name'>{{item.title}}</button>
                    </div>
                </div>
                <div v-if="cfg.mode=='detailEdit'">
                    <div v-if="cfg.mode=='detailEdit'&&cfg.detailEditMode!='edit'">
                        <button class="btn btn-primary btn-edit">EditLang</button>
                        <button class="btn btn-info btn-cancel" data-dismiss="modal">RetrunLang</button>
                    </div>
                    <div v-if="cfg.mode=='detailEdit'&&cfg.detailEditMode=='edit'">
                        <button class="btn btn-primary btn-decommit">SaveLang</button>
                        <button class="btn btn-info btn-decancel" data-dismiss="modal">CancelLang</button>
                    </div>
                </div>
                 <div v-if="cfg.mode=='detail'">
                    <button class="btn btn-info btn-cancel" data-dismiss="modal">RetrunLang</button>
                </div>
            </div>
            <!-- /.box-footer -->
        </form>
    </div>
</div>
</template>
<script>
export default {
  props: ["cfg"],
  mounted: function() {
    self = this;
    $.ajax({
      type: "get",
      url: self.cfg.get.url,
      data:self.cfg.get.params,
      async: true,
      success: function(result) {
        if (result.code == "200") {
          self.detail = result.data;
        }
      }
    });
  },
  data() {
    return {
      detail: {}
    };
  }
};
</script>
