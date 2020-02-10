/*
 |--------------------------------------------------------------------------
 | SkyCaiji (蓝天采集器)
 |--------------------------------------------------------------------------
 | Copyright (c) 2018 https://www.skycaiji.com All rights reserved.
 |--------------------------------------------------------------------------
 | 使用协议  https://www.skycaiji.com/licenses
 |--------------------------------------------------------------------------
 */
'use strict';function ProxyClass(){}
ProxyClass.prototype={constructor:ProxyClass,init_setting:function(proxyConfig){var $_o=this;$('#proxy_ip_table').attr('data-tpl',$('#proxy_ip_table .proxy-ip-tpl').html());$('#proxy_ip_table .proxy-ip-tpl').remove();$('#btn_sub').bind('click',function(){var ip_list=new Array();var user_list=new Array();var pwd_list=new Array();var type_list=new Array();$('[data-name="ip_list[]"]').each(function(){ip_list.push($(this).val())});$('[data-name="user_list[]"]').each(function(){user_list.push($(this).val())});$('[data-name="pwd_list[]"]').each(function(){pwd_list.push($(this).val())});$('[data-name="type_list[]"]').each(function(){type_list.push($(this).val())});if(ip_list){$('[name="ip_list"]').val(JSON.stringify(ip_list))}
if(user_list){$('[name="user_list"]').val(JSON.stringify(user_list))}
if(pwd_list){$('[name="pwd_list"]').val(JSON.stringify(pwd_list))}
if(type_list){$('[name="type_list"]').val(JSON.stringify(type_list))}});$('[name="open"]').bind('click',function(){if($(this).val()==1){$('#proxy_open').show();$('#proxy_api').show()}else{$('#proxy_open').hide();$('#proxy_api').hide()}});$('#batch_proxy_ip').bind('click',function(){windowModal('批量添加',ulink('Proxy/batch'))});$('#add_proxy_ip').bind('click',function(){windowModal('添加代理IP',ulink('Proxy/add'))});$('#invalid_proxy_ip').bind('click',function(){confirmRight('确定清理无效ip？',function(){windowModal('正在清理...',ulink('Proxy/clearInvalid'),{ajax:{success:function(){$_o.reload_iframe('清理完成')}}})})});$('#proxy_ip_iframe').bind('load',function(){$('#panel_proxy_ip .loading').hide();$(this).show()});$('#proxy_ip_table').on('click','.delete-proxy-ip',function(){$(this).parents('tr').eq(0).remove()});$('[name="use"]').bind('click',function(){$('[id^="proxy_use_"]').hide();$('#proxy_use_'+$(this).val()).show()});$('[name="api[open]"]').bind('click',function(){if($(this).val()==1){$('#proxy_api_box').show()}else{$('#proxy_api_box').hide()}});$('#proxy_api .p-api-add').bind('click',function(){$_o.add_api()});$('#proxy_api').on('click','.p-api-format a',function(){var obj=$(this).parents('.p-api-panel').eq(0).find('[data-name="api_format"]');insertAtCaret(obj,$(this).text())});eleExchange('#proxy_api','.p-api-up','.p-api-down','.p-api-panel');$('#proxy_api').on('click','.p-api-delete',function(){var obj=$(this);confirmRight('确定删除？',function(){obj.parents('.p-api-panel').eq(0).remove()})});$('#proxy_api').on('click','.btn-api-test',function(){var config={};$(this).parents('.p-api-panel').eq(0).find('[data-name]').each(function(){var name=$(this).attr('data-name');config[name]=$(this).val()});windowModal('测试接口',ulink('Proxy/testApi'),{ajax:{method:'post',data:{config:config}}})});if(proxyConfig){$('[name="open"][value="'+parseInt(proxyConfig.open)+'"]').trigger('click');$('[name="failed"]').val(parseInt(proxyConfig.failed));$('[name="use"][value="'+proxyConfig.use+'"]').trigger('click');$('[name="use_num"]').val(parseInt(proxyConfig.use_num));$('[name="use_time"]').val(parseInt(proxyConfig.use_time));if(proxyConfig.api){$('[name="api[open]"][value="'+parseInt(proxyConfig.api.open)+'"]').trigger('click');$('[name="api[insert]"]').val(proxyConfig.api.insert)}
if(proxyConfig.apis){for(var i in proxyConfig.apis){$_o.add_api(proxyConfig.apis[i])}}}},reload_iframe:function(msg){$('#myModal').modal('hide');toastr.success(msg);$('#panel_proxy_ip .loading').show();$('#proxy_ip_iframe').hide();$('#proxy_ip_iframe').attr('src',$('#proxy_ip_iframe').attr('src')).hide()},add_api:function(data){data=data?data:{};var tpl=$('#proxy_api_tpl').clone();tpl.removeAttr('id').css('display','block');var unique=generateUUID();var collapseId='api_collapse_'+unique;tpl.find('.p-api-title').attr('href','#'+collapseId);tpl.find('.p-api-collapse').attr('id',collapseId);tpl.find('[data-name]').each(function(){var name=$(this).attr('data-name');$(this).attr('name','apis[i_'+unique+']['+name+']');if(data[name]){$(this).val(data[name])}});if(data.api_url){tpl.find('.p-api-title small').text('：'+data.api_url)}
$('#proxy_api_box').append(tpl)},init_list:function(search){search=search?search:{};if(search){for(var i in search){$('#form_search').find('[name="'+i+'"]').val(search[i])}}
$('#form_list').on('change','[data-name="ip_list[]"],[data-name="user_list[]"],[data-name="pwd_list[]"],[data-name="type_list[]"]',function(){$(this).parents('tr').eq(0).find('[data-name="ips[]"]').prop('checked',!0)});$('#form_list').on('click','.op-delete',function(){var tr=$(this).parents('tr').eq(0);var ip=tr.find('[data-name="ips[]"]').val();$.ajax({type:'get',dataType:'json',url:ulink('Proxy/op?op=delete&ip=_ip_',{'_ip_':ip}),success:function(data){if(data.code==1){tr.fadeOut(100,function(){tr.remove()});toastr.success(data.msg)}else{toastr.error(data.msg)}}})});$('#form_list').on('click','.check-all-ip',function(){var checked=$(this).is(":checked")?true:!1;$('[data-name="ips[]"]').prop('checked',checked)});$('#form_list').on('click','.delete-all-ip',function(){confirmRight('确定删除选中的IP？',function(){$('#form_list').find('[name="op"]').val('delete_all');var ips=new Array();$('#form_list').find('[data-name="ips[]"]').each(function(){if($(this).is(':checked')){ips.push($(this).val())}});if(ips){$('[name="ips"]').val(JSON.stringify(ips))}
$('#form_list').submit()})});$('#form_list').on('click','.update-all-ip',function(){confirmRight('确定修改？',function(){$('#form_list').find('[name="op"]').val('update_all');var ips=new Array();var ip_list=new Array();var user_list=new Array();var pwd_list=new Array();var type_list=new Array();$('#form_list').find('[data-name="ips[]"]').each(function(){if($(this).is(':checked')){ips.push($(this).val());var tr=$(this).parents('tr').eq(0);ip_list.push(tr.find('[data-name="ip_list[]"]').val());user_list.push(tr.find('[data-name="user_list[]"]').val());pwd_list.push(tr.find('[data-name="pwd_list[]"]').val());type_list.push(tr.find('[data-name="type_list[]"]').val())}});if(ips){$('[name="ips"]').val(JSON.stringify(ips))}
if(ip_list){$('[name="ip_list"]').val(JSON.stringify(ip_list))}
if(user_list){$('[name="user_list"]').val(JSON.stringify(user_list))}
if(pwd_list){$('[name="pwd_list"]').val(JSON.stringify(pwd_list))}
if(type_list){$('[name="type_list"]').val(JSON.stringify(type_list))}
$('#form_list').submit()})})},init_add:function(){var $_o=this;var formid='#win_form_proxy_add';$(formid+' .proxy-ip-list').attr('data-tpl','<tr>'+$(formid+' .tpl-proxy-ip').html()+'</tr>');$(formid+' .tpl-proxy-ip').remove();$(formid+' .add-proxy-ip').bind('click',function(){$(formid+' .proxy-ip-list tbody').append($(formid+' .proxy-ip-list').attr('data-tpl'))});$(formid).on('click','.op-delete',function(){$(this).parents('tr').eq(0).remove()});$(formid).bind('submit',function(){$.ajax({type:'post',dataType:'json',url:$(this).attr('action'),data:$(this).serialize(),success:function(data){if(data.code==1){$_o.reload_iframe('添加成功')}else{toastr.error(data.msg)}}});return!1})},init_batch:function(){var $_o=this;var formid='#win_form_proxy_batch';$(formid+' .format a').bind('click',function(){var obj=$('#win_form_proxy_batch input[name="format"]');insertAtCaret(obj,$(this).text())});$(formid+' .btn-test').bind('click',function(){$(formid).find('[name="is_test"]').val(1);$.ajax({type:'POST',dataType:'json',url:$(formid).attr('action'),data:$(formid).serialize(),success:function(data){if(data.code==1){$(formid+' .test-result').show();$(formid+' .test-result').find('textarea').val(data.msg)}else{toastr.error(data.msg)}}})});$(formid).bind('submit',function(){$(formid).find('[name="is_test"]').val('');$.ajax({type:'POST',dataType:'json',url:$(this).attr('action'),data:$(this).serialize(),success:function(data){if(data.code==1){$_o.reload_iframe('添加成功')}else{toastr.error(data.msg)}},});return!1})},}
var proxyClass=new ProxyClass()