<template>
<div class="box">
    <div class="box-header">
        <h3 class="box-title">Data Table With Full Features</h3>
    </div>
    <div class="box-body">
        <table id="tableList" class="table table-bordered table-hover">
            <thead>
                <tr>
                <th>Rendering engine</th>
                <th>Browser</th>
                <th>Platform(s)</th>
                <th>Engine version</th>
                <th>CSS grade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Trident</td>
                <td>Internet
                    Explorer 4.0
                </td>
                <td>Win 95+</td>
                <td> 4</td>
                <td>X</td>
                </tr>
                <tr>
                <td>Trident</td>
                <td>Internet
                    Explorer 5.0
                </td>
                <td>Win 95+</td>
                <td>5</td>
                <td>C</td>
                </tr>
                <tr>
                <td>Trident</td>
                <td>Internet
                    Explorer 5.5
                </td>
                <td>Win 95+</td>
                <td>5.5</td>
                <td>A</td>
                </tr>
                <tr>
                <td>Trident</td>
                <td>Internet
                    Explorer 6
                </td>
                <td>Win 98+</td>
                <td>6</td>
                <td>A</td>
                </tr>
                <tr>
                <td>Trident</td>
                <td>Internet Explorer 7</td>
                <td>Win XP SP2+</td>
                <td>7</td>
                <td>A</td>
                </tr>
                <tr>
                <td>Trident</td>
                <td>AOL browser (AOL desktop)</td>
                <td>Win XP</td>
                <td>6</td>
                <td>A</td>
                </tr>
                <tr>
                <td>Gecko</td>
                <td>Firefox 1.0</td>
                <td>Win 98+ / OSX.2+</td>
                <td>1.7</td>
                <td>A</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import "datatables.net-bs/css/dataTables.bootstrap.css";
import "datatables.net/js/jquery.dataTables";
import "datatables.net-bs/js/dataTables.bootstrap";

export default {
  props:["cfg"],
  mounted: function() {
    console.log(this.cfg[0].id);
    $("#tableList").DataTable({
      paging: true,
      lengthChange: false,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false
    });
  }
};
</script>

<style>

</style>
