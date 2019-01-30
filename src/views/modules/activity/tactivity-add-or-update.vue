<template>
  <el-dialog
    :title="!dataForm.id ? '新增活动' : '修改活动'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="所属商家" prop="shopId">
            <ShopPicker @changeSelectCallBack="shopChangeSelectCallBack" :value="dataForm.shopId"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="活动名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="dataForm.startTime"
              type="date"
              placeholder="活动开始时间"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="dataForm.endTime"
              type="date"
              placeholder="活动结束时间"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="活动类型" prop="type">
            <el-select class="select" v-model="dataForm.type" placeholder="请选择" >
              <el-option :value="1" label="满免邮"></el-option>
              <el-option :value="2" label="满减现金"></el-option>
              <el-option :value="3" label="满减抵压金"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="满多少元" prop="meet">
            <el-input v-model="dataForm.meet" placeholder="满多少元"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="减多少" prop="cash">
            <el-input v-model="dataForm.cash" placeholder="减多少元，满免费为0"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="优惠券数" prop="provideNum">
            <el-input v-model="dataForm.provideNum" placeholder="请输入要生成的优惠券数量"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="活动状态" prop="status">
        <el-select class="select" v-model="dataForm.status" placeholder="请选择" >
          <el-option :value="0" label="未开始"></el-option>
          <el-option :value="1" label="进行中"></el-option>
          <el-option :value="2" label="已结束"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ShopPicker from "@/components/ShopPicker";
export default {
  components: {
    ShopPicker
  },
  data() {
    return {
      visible: false,
      dataForm: {
        shopId: null,
        startTime:'',
        endTime:'',
        type:null,
        status:null
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      dataRule: {
        shopId: [{ required: true, message: "请选择商家", trigger: "blur" }],
        name: [
          { required: true, message: "活动名称不能为空", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请选择活动开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择活动结束时间", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择活动类型", trigger: "blur" }],
        status: [
          { required: true, message: "请选择活动状态", trigger: "blur" }
        ],
        meet: [
          { required: true, message: "请输入需满多少元", trigger: "blur" }
        ],
        cash: [
          { required: true, message: "请输入可减多少", trigger: "blur" }
        ],
        provideNum: [
          { required: true, message: "请输入优惠券数", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择状态", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/sales/tactivity/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.tActivity;
            }
          });
        }
      });
    },
    shopChangeSelectCallBack(obj) {
      if(obj.shopId==0)obj.shopName="不限";
      this.dataForm.shopId = obj.shopId;
      this.dataForm.shopName = obj.shopName;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/sales/tactivity/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "put",
            data: this.$http.adornData(this.dataForm)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    }
  }
};
</script>
