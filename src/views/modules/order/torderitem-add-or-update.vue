<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="订单id" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder="订单id"></el-input>
    </el-form-item>
    <el-form-item label="药品id" prop="productId">
      <el-input v-model="dataForm.productId" placeholder="药品id"></el-input>
    </el-form-item>
    <el-form-item label="药品名称" prop="productName">
      <el-input v-model="dataForm.productName" placeholder="药品名称"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input v-model="dataForm.price" placeholder="价格"></el-input>
    </el-form-item>
    <el-form-item label="商品编号" prop="sn">
      <el-input v-model="dataForm.sn" placeholder="商品编号"></el-input>
    </el-form-item>
    <el-form-item label="药品图片" prop="productImg">
      <el-input v-model="dataForm.productImg" placeholder="药品图片"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="quantity">
      <el-input v-model="dataForm.quantity" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="删除标识" prop="delFlag">
      <el-input v-model="dataForm.delFlag" placeholder="删除标识"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          orderId: '',
          productId: '',
          productName: '',
          price: '',
          sn: '',
          productImg: '',
          quantity: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          orderId: [
            { required: true, message: '订单id不能为空', trigger: 'blur' }
          ],
          productId: [
            { required: true, message: '药品id不能为空', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '药品名称不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '价格不能为空', trigger: 'blur' }
          ],
          sn: [
            { required: true, message: '商品编号不能为空', trigger: 'blur' }
          ],
          productImg: [
            { required: true, message: '药品图片不能为空', trigger: 'blur' }
          ],
          quantity: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          delFlag: [
            { required: true, message: '删除标识不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/generator/torderitem/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderId = data.torderitem.orderId
                this.dataForm.productId = data.torderitem.productId
                this.dataForm.productName = data.torderitem.productName
                this.dataForm.price = data.torderitem.price
                this.dataForm.sn = data.torderitem.sn
                this.dataForm.productImg = data.torderitem.productImg
                this.dataForm.quantity = data.torderitem.quantity
                this.dataForm.remarks = data.torderitem.remarks
                this.dataForm.delFlag = data.torderitem.delFlag
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/torderitem/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'orderId': this.dataForm.orderId,
                'productId': this.dataForm.productId,
                'productName': this.dataForm.productName,
                'price': this.dataForm.price,
                'sn': this.dataForm.sn,
                'productImg': this.dataForm.productImg,
                'quantity': this.dataForm.quantity,
                'remarks': this.dataForm.remarks,
                'delFlag': this.dataForm.delFlag
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
